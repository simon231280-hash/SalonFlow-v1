from datetime import datetime

from pydantic import BaseModel, Field


class InventoryTransactionBase(BaseModel):
    product_id: int

    quantity: int = Field(
        gt=0,
        description="Quantity must be greater than zero",
    )

    note: str | None = None


class StockInCreate(InventoryTransactionBase):
    pass


class StockOutCreate(InventoryTransactionBase):
    pass


class InventoryTransactionResponse(BaseModel):
    id: int
    product_id: int
    transaction_type: str
    quantity: int
    note: str | None
    created_at: datetime

    class Config:
        from_attributes = True
