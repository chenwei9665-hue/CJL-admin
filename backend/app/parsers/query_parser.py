from __future__ import annotations

import re
from dataclasses import dataclass

SUPPORTED_FALLBACK = "该问题暂不支持。请改问收入、利润、成本、费用、工资条或库存相关问题。"

METRIC_KEYWORDS = {
    "收入": "revenue",
    "利润": "profit",
    "成本": "cost",
    "费用": "expense",
}
PLATFORMS = ["天猫", "抖音", "京东"]
STORES = ["天猫旗舰店", "抖音直播店", "京东自营店"]


@dataclass
class ParseResult:
    success: bool
    category: str | None = None
    params: dict | None = None
    message: str | None = None


def parse_question(question: str) -> ParseResult:
    text = question.strip()

    if "工资" in text or "工资条" in text:
        employee = _extract_employee(text)
        month = _extract_month(text)
        return ParseResult(True, "payroll", {"employee": employee, "month": month})

    if "库存" in text and ("几天" in text or "可售" in text or "支撑" in text):
        sku = _extract_sku(text)
        return ParseResult(True, "inventory_days", {"sku": sku})

    for key, metric in METRIC_KEYWORDS.items():
        if key in text:
            return ParseResult(
                True,
                "metric",
                {
                    "metric": metric,
                    "metric_label": key,
                    "platform": _extract_platform(text),
                    "store": _extract_store(text),
                    "sku": _extract_sku(text),
                    "time": _extract_time(text),
                },
            )

    return ParseResult(False, message=SUPPORTED_FALLBACK)


def _extract_platform(text: str) -> str | None:
    return next((item for item in PLATFORMS if item in text), None)


def _extract_store(text: str) -> str | None:
    return next((item for item in STORES if item in text), None)


def _extract_sku(text: str) -> str | None:
    match = re.search(r"SKU[- ]?\d{4}", text, re.IGNORECASE)
    if match:
        return match.group(0).upper().replace(" ", "-")
    return None


def _extract_employee(text: str) -> str | None:
    names = ["张敏", "李强", "王芳"]
    known = next((name for name in names if name in text), None)
    if known:
        return known

    match = re.search(r"([\u4e00-\u9fa5]{2,3})\s*\d{0,2}\s*月?\s*工资", text)
    if match:
        return match.group(1)

    generic_match = re.search(r"([\u4e00-\u9fa5]{2,3})\s*工资", text)
    if generic_match:
        return generic_match.group(1)

    return None


def _extract_month(text: str) -> str | None:
    month_match = re.search(r"(\d{1,2})月", text)
    if month_match:
        month = int(month_match.group(1))
        return f"2025-{month:02d}"
    aliases = {"本月": "2025-03", "上月": "2025-02"}
    return next((value for key, value in aliases.items() if key in text), "2025-02")


def _extract_time(text: str) -> dict:
    if "上周" in text:
        return {"type": "week", "value": "2025-W09", "label": "上周"}
    if "本周" in text:
        return {"type": "week", "value": "2025-W10", "label": "本周"}
    if "昨日" in text:
        return {"type": "date", "value": "2025-03-08", "label": "昨日"}
    if "本月" in text:
        return {"type": "month", "value": "2025-03", "label": "本月"}
    month_match = re.search(r"(\d{1,2})月", text)
    if month_match:
        month = int(month_match.group(1))
        return {"type": "month", "value": f"2025-{month:02d}", "label": f"{month}月"}
    return {"type": "month", "value": "2025-02", "label": "2月"}
