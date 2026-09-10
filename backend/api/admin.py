"""Private owner portal API. Every route is independently role protected."""
from __future__ import annotations

import json
import re
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile, status
from pydantic import BaseModel, Field
from sqlalchemy import func
from sqlalchemy.orm import Session

from api.auth import require_admin
from api.content import SUPPORTED_LOCALES
from db import models
from db.models import User, UserOTP, UserSession
from db.session import get_db
from services.audit import record_activity

router = APIRouter(dependencies=[Depends(require_admin)])
_CONTENT_KEY_RE = re.compile(r"^[a-zA-Z][a-zA-Z0-9_.-]{0,190}$")
MAX_MEDIA_BYTES = 5 * 1024 * 1024


class ContentUpdate(BaseModel):
    value: str = Field(..., min_length=1, max_length=10000)
    is_published: bool = True


def _content_key(locale: str, key: str) -> str:
    if locale not in SUPPORTED_LOCALES or not _CONTENT_KEY_RE.fullmatch(key):
        raise HTTPException(status_code=422, detail="Invalid locale or content key.")
    return f"{locale}:{key}"


@router.get("/overview")
def overview(db: Session = Depends(get_db)):
    """Return only measured application data; an empty database returns zeroes."""
    now = datetime.utcnow()
    day_ago = now - timedelta(days=1)
    week_ago = now - timedelta(days=7)
    active_sessions = db.query(UserSession).filter(
        UserSession.is_revoked.is_(False), UserSession.expires_at > now,
    ).count()
    language_rows = db.query(
        models.ActivityLog.details, func.count(models.ActivityLog.id),
    ).filter(models.ActivityLog.activity_type == "feature.language_switch").group_by(
        models.ActivityLog.details
    ).all()
    languages = []
    for details, count in language_rows:
        try:
            lang = json.loads(details or "{}").get("lang")
        except (TypeError, json.JSONDecodeError):
            lang = None
        if lang:
            languages.append({"language": lang, "count": count})
    return {
        "total_users": db.query(User).count(),
        "new_users_7d": db.query(User).filter(User.created_at >= week_ago).count(),
        "active_sessions": active_sessions,
        "active_users_24h": db.query(User).filter(User.last_seen_at >= day_ago).count(),
        "otp_requests_24h": db.query(models.ActivityLog).filter(
            models.ActivityLog.activity_type == "auth.otp_requested",
            models.ActivityLog.logged_at >= day_ago,
        ).count(),
        "otp_verified_24h": db.query(models.ActivityLog).filter(
            models.ActivityLog.activity_type == "auth.otp_verified",
            models.ActivityLog.logged_at >= day_ago,
        ).count(),
        "otp_failed_24h": db.query(models.ActivityLog).filter(
            models.ActivityLog.activity_type == "auth.otp_failed",
            models.ActivityLog.logged_at >= day_ago,
        ).count(),
        "feature_events_7d": db.query(models.ActivityLog).filter(
            models.ActivityLog.activity_type.like("feature.%"),
            models.ActivityLog.logged_at >= week_ago,
        ).count(),
        "language_usage": sorted(languages, key=lambda item: item["count"], reverse=True),
    }


@router.get("/content")
def list_content(db: Session = Depends(get_db)):
    rows = db.query(models.SiteContent).order_by(models.SiteContent.locale, models.SiteContent.content_key).all()
    return [{
        "id": row.id,
        "locale": row.locale,
        "key": row.content_key.split(":", 1)[1] if ":" in row.content_key else row.content_key,
        "value": row.value,
        "is_published": row.is_published,
        "updated_at": row.updated_at,
    } for row in rows]


@router.put("/content/{locale}/{key:path}")
def update_content(
    locale: str,
    key: str,
    payload: ContentUpdate,
    request: Request,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    stored_key = _content_key(locale, key)
    row = db.query(models.SiteContent).filter(models.SiteContent.content_key == stored_key).first()
    if row is None:
        row = models.SiteContent(locale=locale, content_key=stored_key, value=payload.value.strip(), is_published=payload.is_published, updated_by=admin.id)
        db.add(row)
        action = "created"
    else:
        row.value = payload.value.strip()
        row.is_published = payload.is_published
        row.updated_by = admin.id
        action = "updated"
    record_activity(db, "admin.content_" + action, user_id=admin.id, details={"locale": locale, "key": key}, request=request)
    db.commit()
    db.refresh(row)
    return {"locale": locale, "key": key, "value": row.value, "is_published": row.is_published, "updated_at": row.updated_at}


@router.get("/users")
def list_users(limit: int = 50, db: Session = Depends(get_db)):
    safe_limit = min(max(limit, 1), 100)
    rows = db.query(User).order_by(User.created_at.desc()).limit(safe_limit).all()
    return [{"id": row.id, "name": row.name, "email": row.email, "role": row.role, "is_active": row.is_active, "created_at": row.created_at, "last_login_at": row.last_login_at} for row in rows]


@router.get("/audit-logs")
def audit_logs(limit: int = 100, db: Session = Depends(get_db)):
    safe_limit = min(max(limit, 1), 200)
    rows = db.query(models.ActivityLog).order_by(models.ActivityLog.logged_at.desc()).limit(safe_limit).all()
    return [{"id": row.id, "user_id": row.user_id, "activity_type": row.activity_type, "details": row.details, "logged_at": row.logged_at} for row in rows]


@router.get("/media")
def list_media(db: Session = Depends(get_db)):
    rows = db.query(models.MediaAsset).order_by(models.MediaAsset.created_at.desc()).all()
    return [{"id": row.id, "filename": row.filename, "content_type": row.content_type, "size_bytes": row.size_bytes, "is_published": row.is_published, "created_at": row.created_at} for row in rows]


@router.post("/media", status_code=status.HTTP_201_CREATED)
async def upload_media(
    request: Request,
    file: UploadFile = File(...),
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    if file.content_type not in {"image/jpeg", "image/png", "image/webp", "image/gif"}:
        raise HTTPException(status_code=415, detail="Only JPEG, PNG, WebP, and GIF images are allowed.")
    data = await file.read(MAX_MEDIA_BYTES + 1)
    if not data or len(data) > MAX_MEDIA_BYTES:
        raise HTTPException(status_code=413, detail="Image must be between 1 byte and 5 MB.")
    asset = models.MediaAsset(filename=(file.filename or "upload")[:255], content_type=file.content_type, data=data, size_bytes=len(data), uploaded_by=admin.id)
    db.add(asset)
    db.flush()
    record_activity(db, "admin.media_uploaded", user_id=admin.id, details={"media_id": asset.id}, request=request)
    db.commit()
    return {"id": asset.id, "filename": asset.filename, "url": f"/api/media/{asset.id}"}


@router.delete("/media/{media_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_media(media_id: int, request: Request, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    asset = db.query(models.MediaAsset).filter(models.MediaAsset.id == media_id).first()
    if asset is None:
        raise HTTPException(status_code=404, detail="Media asset not found.")
    db.delete(asset)
    record_activity(db, "admin.media_deleted", user_id=admin.id, details={"media_id": media_id}, request=request)
    db.commit()
    return None

