from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DNSRecord(Base):
    __tablename__ = "dns_records"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    hosted_zone_id: Mapped[int] = mapped_column(
        ForeignKey("hosted_zones.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    value: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    ttl: Mapped[int] = mapped_column(
        Integer,
        default=300,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    hosted_zone: Mapped["HostedZone"] = relationship(
        back_populates="records",
    )