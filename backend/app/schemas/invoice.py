from datetime import datetime
from decimal import Decimal
from app.schemas.invoice_product_item import (
    InvoiceProductItemRead,
)
from pydantic import BaseModel, ConfigDict

from app.schemas.customer import CustomerResponse
from app.schemas.invoice_product_item import (
    InvoiceProductItemRead,
)

class InvoiceItemRead(BaseModel):
    id: int
    service_name: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal

    model_config = ConfigDict(from_attributes=True)

class InvoiceProductItemRead(BaseModel):
    id: int

    product_id: int
    quantity: int

    unit_price: Decimal
    total_price: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )

class PaymentSummary(BaseModel):
    id: int
    amount: Decimal
    payment_method: str
    reference_number: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CustomerSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str | None


class InvoiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    invoice_number: str

    customer: CustomerSummary

    appointment_id: int
    user_id: int

    subtotal: Decimal
    discount: Decimal
    tax: Decimal
    total: Decimal

    status: str
    payment_method: str | None

    created_at: datetime

    items: list[InvoiceItemRead]
    product_items: list[InvoiceProductItemRead]
    payments: list[PaymentSummary]

    paid_amount: Decimal
    balance: Decimal
    payment_count: int
    is_paid: bool
    product_items: list[InvoiceProductItemRead]

class InvoiceUpdate(BaseModel):
    discount: Decimal | None = None
    tax: Decimal | None = None
    payment_method: str | None = None
    status: str | None = None
