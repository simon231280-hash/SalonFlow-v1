from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class PaymentCreate(BaseModel):
    invoice_id: int
    amount: Decimal
    payment_method: str
    reference_number: str | None = None
    notes: str | None = None


class PaymentUpdate(BaseModel):
    amount: Decimal | None = None
    payment_method: str | None = None
    reference_number: str | None = None
    notes: str | None = None


class PaymentRead(BaseModel):
    id: int

    invoice_id: int
    amount: Decimal

    payment_method: str
    reference_number: str | None
    notes: str | None

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
