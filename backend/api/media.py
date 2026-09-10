"""Public delivery for explicitly published owner-uploaded images."""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from db import models
from db.session import get_db

router = APIRouter()


@router.get("/{media_id}", include_in_schema=False)
def get_media(media_id: int, db: Session = Depends(get_db)):
    asset = db.query(models.MediaAsset).filter(
        models.MediaAsset.id == media_id,
        models.MediaAsset.is_published.is_(True),
    ).first()
    if asset is None:
        raise HTTPException(status_code=404, detail="Media asset not found.")
    return Response(content=asset.data, media_type=asset.content_type, headers={"Cache-Control": "public, max-age=86400"})
