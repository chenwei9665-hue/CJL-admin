from __future__ import annotations


class AIService:
    """Reserved extension point for future LLM/Dify integration."""

    def build_weekly_business_summary(self, current_week: dict, previous_week: dict) -> str:
        rev_delta = current_week.get("revenue", 0) - previous_week.get("revenue", 0)
        profit_delta = current_week.get("profit", 0) - previous_week.get("profit", 0)
        expense_delta = current_week.get("expense", 0) - previous_week.get("expense", 0)

        trend = "增长" if rev_delta >= 0 else "下滑"
        profit_trend = "改善" if profit_delta >= 0 else "承压"
        reason = "费用可控" if expense_delta <= 0 else "广告与运营费用上升"

        return (
            f"本周收入较上周{trend}{abs(rev_delta):.0f}元，利润{profit_trend}{abs(profit_delta):.0f}元，"
            f"主要原因是{reason}。"
        )
