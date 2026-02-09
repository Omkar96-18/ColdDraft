from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ProspectBase(BaseModel):
    full_name: str
    ethnicity: Optional[str] = None
    profession: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    interests_hobbies: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    region: Optional[str] = None
    linkedin_url: Optional[str] = None
    instagram_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    previous_post_text: Optional[str] = None


class ProspectCreate(ProspectBase):
    campaign_id: int


class ProspectResponse(ProspectBase):
    id: int
    campaign_id: int
    created_at: datetime

    class Config:
        orm_mode = True
