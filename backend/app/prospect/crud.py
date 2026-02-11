from sqlalchemy.orm import Session
from app.prospect.models import Prospect
from app.prospect.schemas import ProspectCreate
from app.prospect import models, schemas
# 1. Create a new prospect
def create_prospect(db: Session, prospect: ProspectCreate):
    db_prospect = Prospect(**prospect.dict())
    db.add(db_prospect)
    db.commit()
    db.refresh(db_prospect)
    return db_prospect

# 2. List all prospects for a specific campaign
def get_prospects_by_campaign(db: Session, campaign_id: int):
    return db.query(Prospect).filter(
        Prospect.campaign_id == campaign_id
    ).all()

# 3. Get a single prospect by their unique ID (Fixes the duplicate error)
def get_prospect(db: Session, prospect_id: int):
    return db.query(Prospect).filter(
        Prospect.id == prospect_id
    ).first()

def create_response(db: Session, response: schemas.ResponseCreate):
    # Check if response already exists for this prospect
    existing_response = db.query(models.Response).filter(
        models.Response.prospect_id == response.prospect_id
    ).first()
    
    if existing_response:
        return existing_response

    db_response = models.Response(
        prospect_id=response.prospect_id,
        email_text=response.email_text,
        whatsapp_text=response.whatsapp_text,
        sms_text=response.sms_text
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response

def get_response_by_prospect(db: Session, prospect_id: int):
    return db.query(models.Response).filter(
        models.Response.prospect_id == prospect_id
    ).first()

def update_response_text(db: Session, prospect_id: int, response_update: schemas.ResponseBase):
    db_response = get_response_by_prospect(db, prospect_id)
    if not db_response:
        return None
    
    # Update fields if they are provided (not None)
    if response_update.email_text is not None:
        db_response.email_text = response_update.email_text
    if response_update.whatsapp_text is not None:
        db_response.whatsapp_text = response_update.whatsapp_text
    if response_update.sms_text is not None:
        db_response.sms_text = response_update.sms_text
        
    db.commit()
    db.refresh(db_response)
    return db_response