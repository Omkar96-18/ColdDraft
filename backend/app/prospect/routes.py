from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.prospect import crud, schemas
from app.campaigns import crud as campaign_crud  # Import campaign CRUD to fetch context
from app.utils.file_generator import save_prospect_json  # Import the file generator utility

# REMOVE prefix="/prospects" here if included in main.py
router = APIRouter(
    tags=["Prospects"]
)

@router.post("/", response_model=schemas.ProspectResponse)
def create_prospect(
    prospect: schemas.ProspectCreate,
    db: Session = Depends(get_db)
):
    # 1. Create Prospect in DB
    db_prospect = crud.create_prospect(db, prospect)
    
    # 2. Fetch Campaign Data for Context
    # We use the campaign_id from the incoming prospect data
    campaign = campaign_crud.get_campaign_by_id(db, prospect.campaign_id)
    
    if campaign:
        try:
            # 3. Generate JSON File
            # We pass db_prospect converted to a dict, and the campaign object.
            # We map the SQLAlchemy model fields to a clean dictionary.
            prospect_dict = {
                "full_name": db_prospect.full_name,
                "ethnicity": db_prospect.ethnicity,
                "profession": db_prospect.profession,
                "age": db_prospect.age,
                "gender": db_prospect.gender,
                "region": db_prospect.region,
                "interests_hobbies": db_prospect.interests_hobbies,
                "linkedin_url": db_prospect.linkedin_url,
                "instagram_url": db_prospect.instagram_url,
                "portfolio_url": db_prospect.portfolio_url,
                "previous_post_text": db_prospect.previous_post_text
            }
            
            file_path = save_prospect_json(prospect_dict, campaign)
            print(f"✅ Generated LLM context at: {file_path}")
            
        except Exception as e:
            # Log error but don't fail the request so the UI doesn't crash
            print(f"❌ Failed to generate LLM file: {e}")
    else:
        print(f"⚠️ Campaign {prospect.campaign_id} not found, skipping file generation.")

    return db_prospect


@router.get(
    "/campaign/{campaign_id}",
    response_model=List[schemas.ProspectResponse]
)
def list_prospects_by_campaign(
    campaign_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_prospects_by_campaign(db, campaign_id)

@router.get("/{prospect_id}", response_model=schemas.ProspectResponse)
def get_prospect_detail(
    prospect_id: int,
    db: Session = Depends(get_db)
):
    db_prospect = crud.get_prospect(db, prospect_id)
    if db_prospect is None:
        raise HTTPException(status_code=404, detail="Prospect not found")
    return db_prospect