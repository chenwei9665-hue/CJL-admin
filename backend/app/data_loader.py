from __future__ import annotations

import json
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parents[2]
MOCK_DATA_DIR = BASE_DIR / "mock-data"


def load_json(filename: str) -> list[dict[str, Any]]:
    with (MOCK_DATA_DIR / filename).open("r", encoding="utf-8") as file:
        return json.load(file)
