from fastapi import APIRouter
from app.llm.message_generator import generate_messages

router = APIRouter()

@router.post("/generate_messages/{prospect_name}")
def get_generated_messages(prospect_name: str):
    return generate_messages(prospect_name)
