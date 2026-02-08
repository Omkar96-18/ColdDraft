from sqlalchemy.orm import Session
from typing import Union, List, Optional, Any
from . import models, schemas

def create_campaign(
    db: Session, 
    campaign: Union[schemas.SalesCampaignCreate, schemas.HiringCampaignCreate, schemas.NetworkingCampaignCreate], 
    user_id: int
) -> Any:
    data = campaign.model_dump()
    data["user_id"] = user_id
    
    # Mapping discriminator types to SQLAlchemy models
    type_mapping = {
        "sales": models.SalesCampaign,
        "hiring": models.HiringCampaign,
        "networking": models.NetworkingCampaign
    }
    
    model_class = type_mapping.get(data["type"], models.Campaign)
    db_item = model_class(**data)
        
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_campaigns_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[models.Campaign]:
    # Security: .filter(user_id) ensures users only see their own data
    return db.query(models.Campaign)\
             .filter(models.Campaign.user_id == user_id)\
             .offset(skip).limit(limit).all()

def delete_campaign(db: Session, campaign_id: int, user_id: int):
    db_item = db.query(models.Campaign).filter(
        models.Campaign.id == campaign_id, 
        models.Campaign.user_id == user_id
    ).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item