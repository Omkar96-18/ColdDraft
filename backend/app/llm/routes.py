from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict

# Import the generate_messages function
from app.llm.message_generator import generate_messages

router = APIRouter()

class GenerateMessagesRequest(BaseModel):
    prospect_name: str

class GenerateMessagesResponse(BaseModel):
    email: str
    sms: str
    whatsapp: str

@router.post("/generate", response_model=GenerateMessagesResponse)
def generate_messages_endpoint(request: GenerateMessagesRequest):
    try:
        messages = generate_messages(request.prospect_name)
        return messages
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Prospect '{request.prospect_name}' not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Message generation failed: {str(e)}")

