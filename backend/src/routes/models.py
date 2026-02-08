from pydantic import BaseModel, EmailStr
from fastapi_mail import ConnectionConfig
from typing import List
from twilio.rest import Client

import os 
from dotenv import load_dotenv

load_dotenv()

print(f"DEBUG: Username: {os.environ.get('MAIL_USERNAME')}")

pwd = os.environ.get('MAIL_PASSWORD', '')
print(f"DEBUG: Password length: {len(pwd)} (Should be 16)")

class EmailSchema(BaseModel):
    email: List[EmailStr]

conf = ConnectionConfig(
    MAIL_USERNAME = os.environ["MAIL_USERNAME"],
    MAIL_PASSWORD = os.environ["MAIL_PASSWORD"],
    MAIL_FROM = os.environ["MAIL_USERNAME"],
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

TWILIO_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_NUMBER = os.environ.get("TWILIO_WHATSAPP_NUMBER")
TWILIO_FROM = os.environ.get("TWILIO_PHONE_NUMBER")

print(f"DEBUG: Whatsapp number: -{TWILIO_WHATSAPP_NUMBER}-")
print(f"DEBUG: Whatsapp number: -{TWILIO_FROM}-")

client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

def send_whatsapp_task(to_number: str, body:str):
    message = client.messages.create(
        from_=TWILIO_WHATSAPP_NUMBER,
        body=body,
        to=f"whatsapp:{to_number}"
    )
    print(f"Message SID: {message.sid}")


def send_sms_task(to_number: str, body: str):
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=body,
            from_=TWILIO_FROM,
            to=to_number
        )
        print(f"SMS Sent! SID: {message.sid}")

    except Exception as e:
        print(f"SMS Error: {e}")