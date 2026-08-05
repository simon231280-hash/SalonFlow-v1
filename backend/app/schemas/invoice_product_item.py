from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class InvoiceProductItemCreate(BaseModel):
    product_id: int
    quantity: int


class InvoiceProductItemRead(BaseModel):
    id: int

    product_id: int
    product_name: str
    quantity: int

    unit_price: Decimal
    total_price: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )
