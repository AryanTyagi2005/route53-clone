from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.hosted_zone import HostedZone
from app.schemas.hosted_zone import (
    HostedZoneCreate,
    HostedZoneUpdate,
)


def create_hosted_zone(
    db: Session,
    hosted_zone: HostedZoneCreate,
) -> HostedZone:
    db_hosted_zone = HostedZone(
        name=hosted_zone.name,
        description=hosted_zone.description,
    )

    try:
        db.add(db_hosted_zone)
        db.commit()
        db.refresh(db_hosted_zone)

        return db_hosted_zone

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail=f"Hosted zone '{hosted_zone.name}' already exists.",
        )


def get_hosted_zones(db: Session) -> list[HostedZone]:
    return db.query(HostedZone).all()


def get_hosted_zone_by_id(
    db: Session,
    hosted_zone_id: int,
) -> HostedZone:
    hosted_zone = (
        db.query(HostedZone)
        .filter(HostedZone.id == hosted_zone_id)
        .first()
    )

    if hosted_zone is None:
        raise HTTPException(
            status_code=404,
            detail="Hosted zone not found.",
        )

    return hosted_zone


def delete_hosted_zone(
    db: Session,
    hosted_zone_id: int,
) -> None:
    hosted_zone = (
        db.query(HostedZone)
        .filter(HostedZone.id == hosted_zone_id)
        .first()
    )

    if hosted_zone is None:
        raise HTTPException(
            status_code=404,
            detail="Hosted zone not found.",
        )

    db.delete(hosted_zone)
    db.commit()

def update_hosted_zone(
    db: Session,
    hosted_zone_id: int,
    hosted_zone_data: HostedZoneUpdate,
) -> HostedZone:
    hosted_zone = (
        db.query(HostedZone)
        .filter(HostedZone.id == hosted_zone_id)
        .first()
    )

    if hosted_zone is None:
        raise HTTPException(
            status_code=404,
            detail="Hosted zone not found.",
        )

    hosted_zone.name = hosted_zone_data.name
    hosted_zone.description = hosted_zone_data.description

    try:
        db.commit()
        db.refresh(hosted_zone)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Hosted zone already exists.",
        )

    return hosted_zone