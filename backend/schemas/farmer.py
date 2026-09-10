from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date, datetime

class FarmerProfileCreate(BaseModel):
    village_name: Optional[str] = None
    block_name: Optional[str] = None
    district_name: Optional[str] = None
    state_name: Optional[str] = None
    experience_years: Optional[int] = Field(default=0, ge=0)
    primary_crop: Optional[str] = None
    land_holding_acres: Optional[float] = Field(default=0.0, ge=0.0)
    has_irrigation: Optional[bool] = False
    has_tractor: Optional[bool] = False

class FarmerProfileResponse(FarmerProfileCreate):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class FarmerFieldCreate(BaseModel):
    field_name: str = Field(..., max_length=255)
    acreage: Optional[float] = Field(default=None, ge=0.0)
    soil_type: Optional[str] = Field(default=None, max_length=100)
    current_crop: Optional[str] = Field(default=None, max_length=100)
    sowing_date: Optional[date] = None
    irrigation_type: Optional[str] = Field(default=None, max_length=100)
    polygon_geojson: Optional[str] = None  # preserve existing column support

class FarmerFieldUpdate(BaseModel):
    field_name: Optional[str] = Field(default=None, max_length=255)
    acreage: Optional[float] = Field(default=None, ge=0.0)
    soil_type: Optional[str] = Field(default=None, max_length=100)
    current_crop: Optional[str] = Field(default=None, max_length=100)
    sowing_date: Optional[date] = None
    irrigation_type: Optional[str] = Field(default=None, max_length=100)

class FarmerFieldResponse(BaseModel):
    id: int
    user_id: int
    field_name: Optional[str] = None
    acreage: Optional[float] = None
    soil_type: Optional[str] = None
    current_crop: Optional[str] = None
    sowing_date: Optional[date] = None
    irrigation_type: Optional[str] = None
    polygon_geojson: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)
