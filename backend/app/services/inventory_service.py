from __future__ import annotations

from app.data_loader import load_json

INVENTORY = load_json("inventory.json")


class InventoryService:
    def available_days(self, sku: str | None) -> dict | None:
        if not sku:
            return None
        item = next((row for row in INVENTORY if row["sku"] == sku), None)
        if not item:
            return None
        avg_sales = sum(item["last_7_days_sales"]) / 7
        days = item["current_stock"] / avg_sales if avg_sales else 0
        return {
            "sku": item["sku"],
            "name": item["name"],
            "current_stock": item["current_stock"],
            "avg_daily_sales": round(avg_sales, 2),
            "available_days": round(days, 1),
            "suggestion": "建议尽快补货。" if days < 10 else "库存健康，可持续观察。",
        }
