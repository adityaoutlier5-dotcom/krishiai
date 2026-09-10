"""Small, database-backed audit/event helpers.

These records are intentionally server-side only. They power the owner portal
without inventing metrics or exposing activity data to ordinary users.
"""
import json
from typing import Any, Optional

from fastapi import Request
from sqlalchemy.orm import Session

from db.models import ActivityLog


def record_activity(
    db: Session,
    activity_type: str,
    *,
    user_id: Optional[int] = None,
    details: Optional[dict[str, Any]] = None,
    request: Optional[Request] = None,
) -> None:
    """Stage a minimal auditable event; callers commit with their transaction."""
    db.add(ActivityLog(
        user_id=user_id,
        activity_type=activity_type[:100],
        details=json.dumps(details or {}, separators=(",", ":"))[:4000],
        ip_address=(request.client.host if request and request.client else None),
        device_info=(request.headers.get("user-agent", "")[:255] if request else None),
    ))
