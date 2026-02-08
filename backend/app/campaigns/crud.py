from sqlalchemy.orm import Session
from typing import Union, List, Any
from . import models, schemas

def create_campaign(
    db: Session, 
    campaign: Union[schemas.SalesCampaignCreate, schemas.HiringCampaignCreate, schemas.NetworkingCampaignCreate], 
    user_id: int
) -> Any:
    # dump model to dict
    data = campaign.model_dump()
    data["user_id"] = user_id
    
    # Mapping discriminator types to SQLAlchemy models
    type_mapping = {
        "sales": models.SalesCampaign,
        "hiring": models.HiringCampaign,
        "networking": models.NetworkingCampaign
    }
    
    # Select the correct model class
    model_class = type_mapping.get(data["type"])
    
    if not model_class:
        # Fallback if type is invalid (should be caught by Pydantic though)
        raise ValueError(f"Invalid campaign type: {data.get('type')}")

    # Create DB Item
    # IMPORTANT: 'data' dict must exactly match columns in the model_class
    db_item = model_class(**data)
        
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_campaigns_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[models.Campaign]:
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
        return True
    return False