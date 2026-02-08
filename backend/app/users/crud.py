from sqlalchemy.orm import Session
from app.users.models import User
from app.users.schemas import UserCreate
from app.core.security import hash_password, verify_password


def create_user(db: Session, user: UserCreate):
    db_user = User(
        name=user.name,
        company=user.company,
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session):
    return db.query(User).all()

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user