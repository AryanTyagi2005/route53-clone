from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, Response, status

from app.api.dependencies import get_db
from app.schemas.hosted_zone import (
    HostedZoneCreate,
    HostedZoneUpdate,
    HostedZoneResponse,
)
from app.services.hosted_zone_service import (
    create_hosted_zone,
    delete_hosted_zone,
    get_hosted_zone_by_id,
    get_hosted_zones,
    update_hosted_zone,
)
router = APIRouter(
    prefix="/hosted-zones",
    tags=["Hosted Zones"],
)


@router.post(
    "",
    response_model=HostedZoneResponse,
    status_code=201,
)
def create_hosted_zone_endpoint(
    hosted_zone: HostedZoneCreate,
    db: Session = Depends(get_db),
):
    return create_hosted_zone(
        db=db,
        hosted_zone=hosted_zone,
    )
@router.get(
    "",
    response_model=list[HostedZoneResponse],
)
def get_hosted_zones_endpoint(
    db: Session = Depends(get_db),
):
    return get_hosted_zones(db)
@router.get(
    "/{hosted_zone_id}",
    response_model=HostedZoneResponse,
)
def get_hosted_zone_by_id_endpoint(
    hosted_zone_id: int,
    db: Session = Depends(get_db),
):
    return get_hosted_zone_by_id(
        db=db,
        hosted_zone_id=hosted_zone_id,
    )


@router.delete(
    "/{hosted_zone_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_hosted_zone_endpoint(
    hosted_zone_id: int,
    db: Session = Depends(get_db),
):
   
    delete_hosted_zone(
        db=db,
        hosted_zone_id=hosted_zone_id,
    )

    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )
@router.put(
    "/{hosted_zone_id}",
    response_model=HostedZoneResponse,
)
def update_hosted_zone_endpoint(
    hosted_zone_id: int,
    hosted_zone: HostedZoneUpdate,
    db: Session = Depends(get_db),
):
    return update_hosted_zone(
        db=db,
        hosted_zone_id=hosted_zone_id,
        hosted_zone_data=hosted_zone,
    )