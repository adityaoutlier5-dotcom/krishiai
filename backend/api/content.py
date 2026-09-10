"""Publicly readable, owner-managed website content and lightweight events."""
from __future__ import annotations

import re
from typing import Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from db import models
from db.session import get_db
from services.audit import record_activity

router = APIRouter()
SUPPORTED_LOCALES = {"en", "hi", "kn", "ta", "te", "ml", "mr", "bn", "pa", "gu", "hi_en"}
TRACKABLE_EVENTS = {
    "weather_search", "mandi_search", "disease_upload", "crop_prediction",
    "language_switch", "whatsapp_share", "contact_submit", "tool_interaction",
}


class PublicEvent(BaseModel):
    type: Literal[
        "weather_search", "mandi_search", "disease_upload", "crop_prediction",
        "language_switch", "whatsapp_share", "contact_submit", "tool_interaction",
    ]
    lang: Optional[str] = Field(None, max_length=10)


@router.get("/{locale}")
def get_public_content(locale: str, db: Session = Depends(get_db)):
    """Return only published overrides for the requested public locale."""
    if locale not in SUPPORTED_LOCALES:
        raise HTTPException(status_code=404, detail="Unsupported locale.")
    rows = db.query(models.SiteContent).filter(
        models.SiteContent.locale == locale,
        models.SiteContent.is_published.is_(True),
    ).all()
    return {
        row.content_key.split(":", 1)[1]: row.value
        for row in rows if ":" in row.content_key
    }


@router.post("/events/track", status_code=status.HTTP_204_NO_CONTENT)
def track_public_event(payload: PublicEvent, request: Request, db: Session = Depends(get_db)):
    """Persist a bounded, non-sensitive product-use event."""
    if payload.type not in TRACKABLE_EVENTS:
        raise HTTPException(status_code=400, detail="Unsupported event.")
    if payload.lang and payload.lang not in SUPPORTED_LOCALES:
        raise HTTPException(status_code=400, detail="Unsupported language.")
    record_activity(db, f"feature.{payload.type}", details={"lang": payload.lang}, request=request)
    db.commit()
    return None
