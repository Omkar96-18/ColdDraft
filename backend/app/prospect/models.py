from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

# --- Existing Prospect Model (Updated) ---
class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id", ondelete="CASCADE"), nullable=False)
    
    # ... (Your existing columns: full_name, etc.) ...
    full_name = Column(String, nullable=False)
    # ... other columns ...

    # Relationship to Responses
    # uselist=False ensures 1-to-1 relationship (One prospect gets ONE response object)
    interaction_log = relationship(
        "Response", 
        back_populates="prospect", 
        uselist=False, 
        cascade="all, delete-orphan"
    )

# --- NEW Response Model ---
class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Key to Prospect
    # unique=True enforces that one prospect can only have ONE row in this table
    prospect_id = Column(Integer, ForeignKey("prospects.id", ondelete="CASCADE"), unique=True, nullable=False)

    # Response Content Channels
    email_text = Column(Text, nullable=True)     # Stores the email reply content
    whatsapp_text = Column(Text, nullable=True)  # Stores the WhatsApp reply content
    sms_text = Column(Text, nullable=True)       # Stores the SMS reply content

    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Back Link
    prospect = relationship("Prospect", back_populates="interaction_log")