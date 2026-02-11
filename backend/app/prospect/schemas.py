from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

# --- Base Schema (Shared properties) ---
class ResponseBase(BaseModel):
    email_text: Optional[str] = None
    whatsapp_text: Optional[str] = None
    sms_text: Optional[str] = None

# --- Create Schema (What frontend sends) ---
class ResponseCreate(ResponseBase):
    prospect_id: int

# --- Response Schema (What API returns) ---
class ResponseOut(ResponseBase):
    id: int
    prospect_id: int
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)