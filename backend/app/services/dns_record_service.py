from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.dns_record import DNSRecord
from app.models.hosted_zone import HostedZone
from app.schemas.dns_record import (
    DNSRecordCreate,
    DNSRecordUpdate,
)


def create_record(
    db: Session,
    hosted_zone_id: int,
    record: DNSRecordCreate,
) -> DNSRecord:
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

    db_record = DNSRecord(
  hosted_zone_id=hosted_zone_id,
        name=record.name,
        type=record.type,
        value=record.value,
        ttl=record.ttl,
    )

    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return db_record


def get_records(
    db: Session,
    hosted_zone_id: int,
) -> list[DNSRecord]:
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

    return (
        db.query(DNSRecord)
        .filter(DNSRecord.hosted_zone_id == hosted_zone_id)
        .all()
    )


def get_record_by_id(
    db: Session,
    hosted_zone_id: int,
    record_id: int,
) -> DNSRecord:
    record = (
        db.query(DNSRecord)
        .filter(
            DNSRecord.id == record_id,
            DNSRecord.hosted_zone_id == hosted_zone_id,
        )
        .first()
    )

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="DNS record not found.",
        )

    return record


def update_record(
    db: Session,
    hosted_zone_id: int,
    record_id: int,
    record_data: DNSRecordUpdate,
) -> DNSRecord:
    record = (
        db.query(DNSRecord)
        .filter(
            DNSRecord.id == record_id,
            DNSRecord.hosted_zone_id == hosted_zone_id,
        )
        .first()
    )

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="DNS record not found.",
        )

    record.name = record_data.name
    record.type = record_data.type
    record.value = record_data.value
    record.ttl = record_data.ttl

    db.commit()
    db.refresh(record)

    return record


def delete_record(
    db: Session,
    hosted_zone_id: int,
    record_id: int,
) -> None:
    record = (
        db.query(DNSRecord)
        .filter(
            DNSRecord.id == record_id,
            DNSRecord.hosted_zone_id == hosted_zone_id,
        )
        .first()
    )

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="DNS record not found.",
        )

    db.delete(record)
    db.commit()