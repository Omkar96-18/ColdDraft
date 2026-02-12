from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import (
    User, Client, Sale, Job, Network, Response, ParentType
)

def create_new_user(
        db: Session,
        user_name: str, 
        user_email_id: str,
        user_company: str,
        user_password: str
):
    user = User(
        user_name=user_name,
        user_email_id=user_email_id,
        user_company=user_company,
        user_password=user_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def create_new_sale(
        db: Session,
        user_id: int,
        name: str,
        description: str
):
    sale = Sale(
        user_id=user_id,
        name=name,
        description=description
    )
    db.add(sale)
    db.commit()
    db.refresh(sale)

    return sale


def create_new_job(
        db:Session,
        user_id:int,
        role: str,
        experience: int,
        location: str,
        skills: str
):
    job = Job(
        user_id=user_id,
        role=role,
        experience=experience,
        location=location,
        skills=skills
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job

def create_new_network(
        db: Session,
        user_id:int,
        purpose: str,
        target: str,
        context: str
):
    network = Network(
        user_id=user_id,
        purpose=purpose,
        target=target,
        context=context
    )

    db.add(network)
    db.commit()
    db.refresh(network)

    return network

def create_new_client(
        db: Session,
        client_name: str,
        client_email: str,
        client_number: str,
        parent_id: int, 
        parent_type: ParentType
):
    client = Client(
        client_name=client_name,
        client_email=client_email,
        client_number=client_number,
        parent_type=parent_type
    )

    if parent_type == ParentType.JOB:
        client.job_id = parent_id
    elif parent_type == ParentType.NETWORK:
        client.network_id = parent_id
    elif parent_type == ParentType.SALE:
        client.sale_id = parent_id
        

    db.add(client)
    db.commit()
    db.refresh(client)

    return client

def create_new_response(
        db: Session,
        client_id: int,
        message: str,
        email: str
):
    response = Response(
        client_id=client_id,
        message=message,
        email=email
    )

    db.add(response)
    db.commit()
    db.refresh(response)

    return response
