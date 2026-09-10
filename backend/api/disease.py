from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, List
from sqlalchemy import desc

from api.auth import get_current_user
from db.session import get_db
from db.models import DiseaseDetection, User
from schemas.disease import DiseaseHistoryResponse

router = APIRouter()

@router.get("/history", response_model=List[DiseaseHistoryResponse])
def get_disease_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get all disease detections for the current user."""
    detections = (
        db.query(DiseaseDetection)
        .filter(DiseaseDetection.user_id == current_user.id)
        .order_by(desc(DiseaseDetection.detected_at))
        .all()
    )
    return detections
