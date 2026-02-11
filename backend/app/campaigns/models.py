from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Optional, Union
from pydantic import BaseModel, ConfigDict
from app.core.database import Base

# --- SQLAlchemy Models ---
class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # sales | hiring | networking
    description = Column(String)
    banner_url = Column(String, nullable=True, default="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80")
    
    prospects = relationship(
        "Prospect",
        back_populates="campaign",
        cascade="all, delete-orphan"
    )

    created_at = Column(DateTime, default=datetime.utcnow)

    __mapper_args__ = {
        "polymorphic_on": type,
        "polymorphic_identity": "campaign",
    }

class SalesCampaign(Campaign):
    __tablename__ = "sales_campaigns"
    id = Column(Integer, ForeignKey("campaigns.id"), primary_key=True)
    product_name = Column(String)
    product_price = Column(Float)
    product_desc = Column(String)
    landing_url = Column(String)

    __mapper_args__ = {"polymorphic_identity": "sales"}

class HiringCampaign(Campaign):
    __tablename__ = "hiring_campaigns"
    id = Column(Integer, ForeignKey("campaigns.id"), primary_key=True)
    role_title = Column(String)
    experience_years = Column(Integer)
    location = Column(String)
    skills_required = Column(String)

    __mapper_args__ = {"polymorphic_identity": "hiring"}

class NetworkingCampaign(Campaign):
    __tablename__ = "networking_campaigns"
    id = Column(Integer, ForeignKey("campaigns.id"), primary_key=True)
    purpose = Column(String)
    target_industry = Column(String)
    intro_context = Column(String)
    relationship_goal = Column(String)

    __mapper_args__ = {"polymorphic_identity": "networking"}


# --- Pydantic Schemas (V2 Updated) ---

class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    banner_url: Optional[str] = None 

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

class CampaignResponse(CampaignBase):
    id: int
    user_id: int
    type: str
    created_at: datetime
    
    # Updated for Pydantic V2
    model_config = ConfigDict(from_attributes=True)

class SalesCampaignResponse(CampaignResponse):
    product_name: str
    product_price: float
    product_desc: Optional[str] = None
    landing_url: Optional[str] = None

class HiringCampaignResponse(CampaignResponse):
    role_title: str
    experience_years: int
    location: str
    skills_required: str

class NetworkingCampaignResponse(CampaignResponse):
    purpose: str
    target_industry: str
    intro_context: Optional[str] = None
    relationship_goal: Optional[str] = None

CampaignAllResponse = Union[
    SalesCampaignResponse, 
    HiringCampaignResponse, 
    NetworkingCampaignResponse
]