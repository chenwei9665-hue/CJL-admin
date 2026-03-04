from __future__ import annotations

from collections import defaultdict

from app.data_loader import load_json

METRICS = load_json("metrics.json")


class MetricsService:
    def query_metric(self, metric: str, filters: dict) -> dict | None:
        records = self._filter_records(filters)
        if not records:
            return None

        total = sum(item[metric] for item in records)
        result = {
            "metric": metric,
            "value": round(total, 2),
            "count": len(records),
            "filters": filters,
        }
        return result

    def weekly_summary(self, week: str) -> dict:
        records = [item for item in METRICS if item["week"] == week]
        bucket = defaultdict(float)
        for item in records:
            bucket["revenue"] += item["revenue"]
            bucket["profit"] += item["profit"]
            bucket["cost"] += item["cost"]
            bucket["expense"] += item["expense"]
        return {k: round(v, 2) for k, v in bucket.items()}

    def _filter_records(self, filters: dict) -> list[dict]:
        output = METRICS
        if filters.get("platform"):
            output = [item for item in output if item["platform"] == filters["platform"]]
        if filters.get("store"):
            output = [item for item in output if item["store"] == filters["store"]]
        if filters.get("sku"):
            output = [item for item in output if item["sku"] == filters["sku"]]
        if filters.get("time"):
            time_filter = filters["time"]
            output = [item for item in output if item[time_filter["type"]] == time_filter["value"]]
        return output
