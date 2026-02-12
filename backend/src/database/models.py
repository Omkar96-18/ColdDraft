from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime, Enum, JSON
from datetime import datetime
import os 
import enum

DATABASE_URL = "sqlite:///./chat.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

Base = declarative_base()

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    user_company = Column(String, nullable=False)
    user_email_id = Column(String, unique=True, index=True, nullable=False)
    user_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    sales = relationship(
        "Sale",
        back_populates="user",
        cascade="all, delete"
    )

    jobs = relationship(
        "Job",
        back_populates="user",
        cascade="all, delete"
    )

    networks = relationship(
        "Network",
        back_populates="user",
        cascade="all, delete"
    )

class ParentType(enum.Enum):
    SALE = "sales"
    JOB = "jobs"
    NETWORK = "networks"

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, nullable=False)
    client_email = Column(String)

    client_number = Column(String, nullable=True)

    sale_id = Column(Integer, ForeignKey("sales.id"), nullable=True)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=True)
    network_id = Column(Integer, ForeignKey("networks.id"), nullable=True)
    parent_type = Column(Enum(ParentType), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    sale = relationship("Sale", back_populates="clients")
    job = relationship("Job", back_populates="clients")
    network = relationship("Network", back_populates="clients")

    responses = relationship(
        "Response",
        back_populates="client",
        order_by="Response.created_at",
        cascade="all, delete"
    )


class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))

    message = Column(Text)
    email = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship(
        "Client",
        back_populates="responses"
    )
    
class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship(
        "User",
        back_populates="sales"
    )

    clients = relationship(
        "Client",
        back_populates="sale"
    )

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    role = Column(String, nullable=False)
    experience = Column(Integer, nullable=False, default=0)
    location = Column(String, nullable=False)
    skills = Column(Text, nullable=False)

    user = relationship(
        "User",
        back_populates="jobs"
    )
    clients = relationship(
        "Client",
        back_populates="job"
    )

class Network(Base):
    __tablename__ = "networks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    purpose = Column(String, nullable=False, default="Growth")
    target = Column(String, nullable=False)
    context = Column(Text, nullable=False)

    user = relationship(
        "User",
        back_populates="networks"
    )

    clients = relationship(
        "Client",
        back_populates="network"
    )


Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False ,autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()