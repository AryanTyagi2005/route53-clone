from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, Response, status

from app.api.dependencies import get_db
from app.schemas.dns_record import (
    DNSRecordCreate,
    DNSRecordResponse,
    DNSRecordUpdate,
)
from app.services.dns_record_service import (
    create_record,
    delete_record,
    get_record_by_id,
    get_records,
    update_record,
)

router = APIRouter(
    prefix="/hosted-zones/{hosted_zone_id}/records",
    tags=["DNS Records"],
)


@router.post(
    "",
    response_model=DNSRecordResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_record_endpoint(
    hosted_zone_id: int,
    record: DNSRecordCreate,
    db: Session = Depends(get_db),
):
   

   return create_record(
    db=db,
    hosted_zone_id=hosted_zone_id,
    record=record,
)

@router.get(
    "",
    response_model=list[DNSRecordResponse],
)
def get_records_endpoint(
    hosted_zone_id: int,
    db: Session = Depends(get_db),
):
    return get_records(
        db=db,
        hosted_zone_id=hosted_zone_id,
    )


@router.get(
    "/{record_id}",
    response_model=DNSRecordResponse,
)
def get_record_by_id_endpoint(
    hosted_zone_id: int,
    record_id: int,
    db: Session = Depends(get_db),
):
    return get_record_by_id(
        db=db,
        hosted_zone_id=hosted_zone_id,
        record_id=record_id,
    )


@router.put(
    "/{record_id}",
    response_model=DNSRecordResponse,
)
def update_record_endpoint(
    hosted_zone_id: int,
    record_id: int,
    record: DNSRecordUpdate,
    db: Session = Depends(get_db),
):
    return update_record(
        db=db,
        hosted_zone_id=hosted_zone_id,
        record_id=record_id,
        record_data=record,
    )


@router.delete(
    "/{record_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_record_endpoint(
    hosted_zone_id: int,
    record_id: int,
    db: Session = Depends(get_db),
):
    delete_record(
        db=db,
        hosted_zone_id=hosted_zone_id,
        record_id=record_id,
    )

    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )