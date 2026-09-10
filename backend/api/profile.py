from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any

from api.auth import get_current_user
from db.session import get_db
from db.models import FarmerProfile, User
from schemas.farmer import FarmerProfileCreate, FarmerProfileResponse

router = APIRouter()

@router.get("/profile", response_model=FarmerProfileResponse)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get the current user's farmer profile."""
    profile = db.query(FarmerProfile).filter(FarmerProfile.user_id == current_user.id).first()
    if not profile:
        profile = FarmerProfile(user_id=current_user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.post("/profile", response_model=FarmerProfileResponse)
def update_profile(
    profile_in: FarmerProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create or update the current user's farmer profile."""
    profile = db.query(FarmerProfile).filter(FarmerProfile.user_id == current_user.id).first()
    if not profile:
        profile = FarmerProfile(user_id=current_user.id, **profile_in.model_dump())
        db.add(profile)
    else:
        for var, value in profile_in.model_dump(exclude_unset=True).items():
            setattr(profile, var, value)
    
    db.commit()
    db.refresh(profile)
    return profile
