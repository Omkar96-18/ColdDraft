from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # sales | hiring | networking
    description = Column(String)
    
    # Fixed: Removed duplicate definition and type hint clutter for SQLAlchemy
    banner_url = Column(String, nullable=True, default="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80")
    
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