from fastapi import FastAPI
from app.core.database import engine, Base
from app.users.models import User
from app.users.routes import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Offline Outreach Engine")

app.include_router(user_router, prefix="/api/users", tags=["Users"])
