from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.prospect import crud, schemas

# REMOVE prefix="/prospects" here
router = APIRouter(
    tags=["Prospects"]
)

@router.post("/", response_model=schemas.ProspectResponse)
def create_prospect(
    prospect: schemas.ProspectCreate,
    db: Session = Depends(get_db)
):
    return crud.create_prospect(db, prospect)


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