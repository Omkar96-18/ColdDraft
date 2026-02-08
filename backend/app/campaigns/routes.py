from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.users.routes import get_current_user
from . import crud, schemas

# FIX: Remove the prefix here. main.py handles it.
router = APIRouter()

@router.post("/", response_model=schemas.CampaignAllResponse)
def create_campaign(
    payload: schemas.SalesCampaignCreate | schemas.HiringCampaignCreate | schemas.NetworkingCampaignCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Uses the logged-in user's ID
    return crud.create_campaign(db=db, campaign=payload, user_id=current_user.id)

@router.get("/", response_model=List[schemas.CampaignAllResponse])
def read_campaigns(
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    # Only returns campaigns for the logged-in user
    return crud.get_campaigns_by_user(db, user_id=current_user.id)

@router.delete("/{campaign_id}")
def delete_campaign(
    campaign_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    deleted = crud.delete_campaign(db, campaign_id=campaign_id, user_id=current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Campaign not found or access denied")
    return {"message": "Campaign deleted"}