from __future__ import annotations

import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from app.parsers.query_parser import SUPPORTED_FALLBACK, parse_question
from app.services.inventory_service import InventoryService
from app.services.message_service import MessageService
from app.services.metrics_service import MetricsService
from app.services.payroll_service import PayrollService

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "frontend-static"

metrics_service = MetricsService()
payroll_service = PayrollService()
inventory_service = InventoryService()
message_service = MessageService()


class DemoHandler(BaseHTTPRequestHandler):
    server_version = "VirtualCFODemo/0.2"

    def _send_json(self, payload: dict | list, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def _send_file(self, path: Path, content_type: str = "text/html; charset=utf-8") -> None:
        if not path.exists() or not path.is_file():
            self._send_json({"success": False, "message": "Not Found"}, status=404)
            return

        raw = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def _read_json(self) -> dict:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return {}
        if length <= 0:
            return {}
        data = self.rfile.read(length)
        try:
            return json.loads(data.decode("utf-8"))
        except json.JSONDecodeError:
            return {}

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/":
            return self._send_file(STATIC_DIR / "index.html")
        if path == "/styles.css":
            return self._send_file(STATIC_DIR / "styles.css", "text/css; charset=utf-8")
        if path == "/app.js":
            return self._send_file(STATIC_DIR / "app.js", "application/javascript; charset=utf-8")

        if path == "/api/health":
            return self._send_json({"status": "ok", "service": "virtual-cfo-demo"})

        if path == "/api/messages":
            messages = message_service.generate_messages()
            return self._send_json({"success": True, "data": messages})

        if path == "/api/payroll":
            query = parse_qs(parsed.query)
            employee = query.get("employee", [None])[0]
            month = query.get("month", [None])[0]
            result = payroll_service.get_payroll(employee, month)
            if not result:
                return self._send_json({"success": False, "message": "未找到对应工资条"}, status=404)
            return self._send_json({"success": True, "data": result})

        self._send_json({"success": False, "message": "Not Found"}, status=404)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/api/query":
            return self._send_json({"success": False, "message": "Not Found"}, status=404)

        payload = self._read_json()
        question = (payload.get("question") or "").strip()
        if not question:
            return self._send_json({"success": False, "answer": "请输入问题"}, status=400)

        parsed_question = parse_question(question)
        if not parsed_question.success:
            return self._send_json({"success": False, "answer": SUPPORTED_FALLBACK})

        if parsed_question.category == "metric":
            result = metrics_service.query_metric(parsed_question.params["metric"], parsed_question.params)
            if not result:
                return self._send_json({
                    "success": False,
                    "category": "metric",
                    "parameters": parsed_question.params,
                    "answer": "未找到匹配数据",
                })
            answer = (
                f"{parsed_question.params['time']['label']}"
                f"{parsed_question.params.get('platform') or parsed_question.params.get('store') or ''}"
                f"{parsed_question.params.get('sku') or ''}"
                f"{parsed_question.params['metric_label']}为 {result['value']:,.0f} 元。"
            )
            return self._send_json({
                "success": True,
                "category": "metric",
                "parameters": parsed_question.params,
                "data": result,
                "answer": answer,
            })

        if parsed_question.category == "payroll":
            result = payroll_service.get_payroll(parsed_question.params.get("employee"), parsed_question.params.get("month"))
            if not result:
                return self._send_json({
                    "success": False,
                    "category": "payroll",
                    "parameters": parsed_question.params,
                    "answer": "未找到对应工资条",
                })
            answer = (
                f"{result['employee']} {result['month']} 工资条：应发 {result['base_salary'] + result['bonus']} 元，"
                f"扣款 {result['deduction']} 元，实发 {result['net_salary']} 元。"
            )
            return self._send_json({
                "success": True,
                "category": "payroll",
                "parameters": parsed_question.params,
                "data": result,
                "answer": answer,
            })

        if parsed_question.category == "inventory_days":
            result = inventory_service.available_days(parsed_question.params.get("sku"))
            if not result:
                return self._send_json({
                    "success": False,
                    "category": "inventory_days",
                    "parameters": parsed_question.params,
                    "answer": "请提供有效 SKU，例如 SKU-1001",
                })
            answer = (
                f"{result['sku']}（{result['name']}）当前库存预计还可支撑 {result['available_days']} 天，"
                f"近 7 天日均销量 {result['avg_daily_sales']} 件，{result['suggestion']}"
            )
            return self._send_json({
                "success": True,
                "category": "inventory_days",
                "parameters": parsed_question.params,
                "data": result,
                "answer": answer,
            })

        return self._send_json({"success": False, "answer": SUPPORTED_FALLBACK})

    def log_message(self, fmt: str, *args) -> None:
        return


def run(host: str = "127.0.0.1", port: int = 8000) -> None:
    server = ThreadingHTTPServer((host, port), DemoHandler)
    print(f"Virtual CFO demo server running at http://{host}:{port}")
    print("Press Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        print("Server stopped")


if __name__ == "__main__":
    run()
