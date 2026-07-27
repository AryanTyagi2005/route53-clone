from datetime import datetime

from pydantic import BaseModel, Field


class DNSRecordBase(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=255,
    )

    type: str = Field(
        ...,
        min_length=1,
        max_length=20,
    )

    value: str = Field(
        ...,
        min_length=1,
        max_length=500,
    )

    ttl: int = Field(
        default=300,
        ge=1,
    )


class DNSRecordCreate(DNSRecordBase):
    pass


class DNSRecordUpdate(DNSRecordBase):
    pass


class DNSRecordResponse(DNSRecordBase):
    id: int
    hosted_zone_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }