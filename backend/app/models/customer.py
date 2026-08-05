from datetime import date, datetime

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    last_name: Mapped[str | None] = mapped_column(
        String(100),
    )

    gender: Mapped[str | None] = mapped_column(
        String(20),
    )

    phone: Mapped[str] = mapped_column(
        String(30),
        index=True,
    )

    email: Mapped[str | None] = mapped_column(
        String,
        nullable=True
    )

    date_of_birth: Mapped[date | None] = mapped_column(
        Date,
    )

    address: Mapped[str | None] = mapped_column(
        Text,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    created_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    creator = relationship("User")

    appointments = relationship(
        "Appointment",
        back_populates="customer",
    )
    invoices = relationship(
         "Invoice",
    )
    invoices = relationship(
        "Invoice",
        back_populates="customer",
    )
