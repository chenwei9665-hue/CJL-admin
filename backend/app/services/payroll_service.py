from __future__ import annotations

from app.data_loader import load_json

PAYROLL = load_json("payroll.json")


class PayrollService:
    def get_payroll(self, employee: str | None, month: str | None) -> dict | None:
        rows = PAYROLL
        if employee:
            rows = [item for item in rows if item["employee"] == employee]
        if month:
            rows = [item for item in rows if item["month"] == month]
        if not rows:
            return None
        return rows[0]
