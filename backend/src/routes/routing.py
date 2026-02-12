from fastapi import APIRouter, BackgroundTasks
from .models import conf, EmailSchema, send_whatsapp_task, send_sms_task
from fastapi_mail import MessageSchema,  MessageType, FastMail
from ..database.schemas import (
    Response, ResponseBase, ResponseCreate, 
)


router = APIRouter()

@router.post("/send_message")
async def send_message(
    background_tasks: BackgroundTasks,
    payload: EmailSchema
):
    message = MessageSchema(
        subject="Fastapi Automatic Email",
        recipients=payload.email,
        body="This is an automated message sent via FastApi Background Task",
        subtype=MessageType.plain
    )

    try:

        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message)

        return {
            "message": "Email has been sent in the background"
        }
    except ConnectionError as e:
        return {
            "error": f"Failed to connect to mail server: {str(e)}"
        }
    
@router.post("/send_whatsapp")
async def send_whatsapp(number: str, message:str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_whatsapp_task, number, message)

    return {
        "status": "Whatsapp message queued"
    }

@router.post("/send_sms")
async def send_sms(
    number: str,
    message: str,
    background_tasks: BackgroundTasks
    ):
    
    if not number.startswith("+"):
        return {
            "error": "Number must include '+' and country code"
        }
    
    background_tasks.add_task(send_sms_task, number, message)
    return {
        "status": "SMS queued for delivery"
    }
        

