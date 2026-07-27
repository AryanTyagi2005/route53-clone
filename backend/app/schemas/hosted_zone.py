from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class HostedZoneCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Domain name of the hosted zone",
    )

    description: str | None = Field(
        default=None,
        max_length=500,
        description="Optional description",
    )

class HostedZoneUpdate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Domain name of the hosted zone",
    )

    description: str | None = Field(
        default=None,
        max_length=500,
        description="Optional description",
    )

class HostedZoneResponse(BaseModel):
    id: int
    name: str
    description: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)