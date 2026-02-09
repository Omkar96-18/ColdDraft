from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from app.users.models import User
from app.users.schemas import UserCreate
from app.core.security import hash_password, verify_password

# --- NEW: Helper for /me endpoint (CRITICAL) ---
def get_user_by_id(db: Session, user_id: int):
    """
    Fetches a user by their primary key ID. 
    Required by get_current_user in routes.py
    """
    return db.query(User).filter(User.id == user_id).first()

# --- Helper to check for existing users ---
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# --- EXISTING FUNCTIONS ---

def create_user(db: Session, user: UserCreate):
    db_user = User(
        name=user.name, 
        company=user.company,
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )

def get_all_users(db: Session):
    return db.query(User).all()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user