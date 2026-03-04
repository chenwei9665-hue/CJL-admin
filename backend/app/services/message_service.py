from __future__ import annotations

from app.data_loader import load_json
from app.services.ai_service import AIService
from app.services.metrics_service import MetricsService

TASKS = load_json("tasks.json")


class MessageService:
    def __init__(self) -> None:
        self.metrics_service = MetricsService()
        self.ai_service = AIService()

    def generate_messages(self) -> list[dict]:
        today_summary = self.metrics_service.weekly_summary("2025-W10")
        last_week_summary = self.metrics_service.weekly_summary("2025-W09")

        messages = [
            {
                "type": "晨报",
                "title": "今日经营晨报",
                "body": (
                    f"昨日收入 {today_summary.get('revenue', 0):,.0f} 元，利润 {today_summary.get('profit', 0):,.0f} 元，"
                    f"费用 {today_summary.get('expense', 0):,.0f} 元。"
                ),
                "timestamp": "08:30",
            },
            {
                "type": "周报",
                "title": "本周经营周报",
                "body": self.ai_service.build_weekly_business_summary(today_summary, last_week_summary),
                "timestamp": "09:00",
            },
            {
                "type": "月报",
                "title": "3 月月报快照",
                "body": "3 月累计收入稳步提升，天猫旗舰店贡献占比最高，抖音店利润率改善明显。",
                "timestamp": "09:15",
            },
            {
                "type": "异常预警",
                "title": "费用异常预警",
                "body": "抖音直播店本周广告费用环比上涨 12%，已触发预警阈值，请关注投放 ROI。",
                "timestamp": "09:20",
            },
            {
                "type": "事项进度",
                "title": "财务事项进度",
                "body": self._build_task_progress(),
                "timestamp": "09:30",
            },
        ]
        return messages

    def _build_task_progress(self) -> str:
        lines = [f"{item['task_name']}：{item['status']}（负责人：{item['owner']}）" for item in TASKS[:3]]
        return "；".join(lines)
