from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)

    campaign_id = Column(
        Integer,
        ForeignKey("campaigns.id", ondelete="CASCADE"),
        nullable=False
    )

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

    campaign = relationship("Campaign", back_populates="prospects")
