from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Union

# --- Base Schema ---
class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    # REMOVED: status: Optional[str] = "draft" (This was causing the crash)
    banner_url: Optional[str] = None # Added this so frontend can send it

# --- Create Schemas ---
class SalesCampaignCreate(CampaignBase):
    type: str = "sales"
    product_name: str
    product_price: float
    product_desc: Optional[str] = None
    landing_url: Optional[str] = None

class HiringCampaignCreate(CampaignBase):
    type: str = "hiring"
    role_title: str
    experience_years: int
    location: str
    skills_required: str

class NetworkingCampaignCreate(CampaignBase):
    type: str = "networking"
    purpose: str
    target_industry: str
    intro_context: Optional[str] = None
    relationship_goal: Optional[str] = None

# --- Response Schemas ---
class CampaignResponse(CampaignBase):
    id: int
    user_id: int
    type: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class SalesCampaignResponse(CampaignResponse):
    product_name: str
    product_price: float
    product_desc: Optional[str]
    landing_url: Optional[str]

class HiringCampaignResponse(CampaignResponse):
    role_title: str
    experience_years: int
    location: str
    skills_required: str

class NetworkingCampaignResponse(CampaignResponse):
    purpose: str
    target_industry: str
    intro_context: Optional[str]
    relationship_goal: Optional[str]

# Union for dynamic responses
CampaignAllResponse = Union[
    SalesCampaignResponse, 
    HiringCampaignResponse, 
    NetworkingCampaignResponse
]