"""Disease detection schemas.

Blueprint contract:
    POST /api/v1/disease/detect (multipart/form-data image)
    reply: { "disease", "confidence", "remedy" }
"""
from pydantic import BaseModel, Field


class DiseaseDetectionResponse(BaseModel):
    disease: str = Field(..., description="Identified disease name")
    confidence: float = Field(..., ge=0.0, le=1.0)
    remedy: str = Field(..., description="Suggested treatment in farmer-friendly language")
    severity: str = Field("unknown", description="low | medium | high")

from typing import Optional
from datetime import datetime
from pydantic import ConfigDict

class DiseaseHistoryResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    image_url: Optional[str] = None
    crop_name: Optional[str] = None
    detected_disease: Optional[str] = None
    confidence: Optional[float] = None
    remedy_suggested: Optional[str] = None
    detected_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)
