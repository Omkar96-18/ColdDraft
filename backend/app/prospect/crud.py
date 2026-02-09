from sqlalchemy.orm import Session
from app.prospect.models import Prospect
from app.prospect.schemas import ProspectCreate

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