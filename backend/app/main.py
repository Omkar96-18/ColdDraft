from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.users.routes import router as user_router
from app.campaigns.routes import router as campaign_router

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Offline Outreach Engine",
    description="Backend API for managing specialized outreach campaigns",
    version="1.0.0"
)

# --- Middleware (CORS) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Router Registration ---
# FIX: Explicitly set the full path here for both
app.include_router(user_router, prefix="/api/users", tags=["Users"])
app.include_router(campaign_router, prefix="/api/campaigns", tags=["Campaigns"])

@app.get("/", tags=["Health Check"])
def root():
    return {
        "status": "online",
        "message": "Offline Outreach Engine API is running",
        "docs": "http://127.0.0.1:8000/docs"
    }