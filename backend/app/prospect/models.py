from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

# =======================
# 1. PROSPECT MODEL
# =======================
class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Key to Campaign
    campaign_id = Column(
        Integer, 
        ForeignKey("campaigns.id", ondelete="CASCADE"), 
        nullable=False
    )

    # Prospect Details
    full_name = Column(String, nullable=False)
    ethnicity = Column(String, nullable=True)
    profession = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    interests_hobbies = Column(Text, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    region = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    instagram_url = Column(String, nullable=True)
    portfolio_url = Column(String, nullable=True)
    previous_post_text = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # --- RELATIONSHIPS ---
    
    # 1. Link back to Campaign (THIS WAS MISSING)
    campaign = relationship("Campaign", back_populates="prospects")

    # 2. Link to Interaction Log (Response)
    interaction_log = relationship(
        "Response", 
        back_populates="prospect", 
        uselist=False, 
        cascade="all, delete-orphan"
    )


# =======================
# 2. RESPONSE MODEL
# =======================
class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Key to Prospect
    prospect_id = Column(Integer, ForeignKey("prospects.id", ondelete="CASCADE"), unique=True, nullable=False)

    # Content Channels
    email_text = Column(Text, nullable=True)
    whatsapp_text = Column(Text, nullable=True)
    sms_text = Column(Text, nullable=True)

    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Back Link
    prospect = relationship("Prospect", back_populates="interaction_log")