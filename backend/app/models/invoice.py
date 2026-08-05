from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    invoice_number: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False,
    )

    customer_id: Mapped[int] = mapped_column(
        ForeignKey("customers.id"),
        nullable=False,
    )

    appointment_id: Mapped[int] = mapped_column(
        ForeignKey("appointments.id"),
        unique=True,
        nullable=False,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
    )

    discount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
    )

    tax: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
    )

    total: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="pending",
    )
    stock_deducted: Mapped[bool] = mapped_column(
        default=False,
    )
    payment_method: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
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

    customer = relationship("Customer")

    appointment = relationship("Appointment")

    user = relationship("User")

    items = relationship(
        "InvoiceItem",
        back_populates="invoice",
        cascade="all, delete-orphan",
    )
    payments = relationship(
        "Payment",
        back_populates="invoice",
        cascade="all, delete-orphan",
    )
    customer = relationship(
        "Customer",
        back_populates="invoices",
    )

    appointment = relationship(
        "Appointment",
        back_populates="invoice",
    )

    user = relationship(
        "User",
        back_populates="invoices",
    )
    product_items = relationship(
        "InvoiceProductItem",
        back_populates="invoice",
        cascade="all, delete-orphan",
    )
