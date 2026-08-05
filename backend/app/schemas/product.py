from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ProductCreate(BaseModel):
    name: str
    sku: str
    category: str | None = None
    description: str | None = None

    cost_price: Decimal = 0
    selling_price: Decimal

    stock_quantity: int = 0
    minimum_stock: int = 5


class ProductUpdate(BaseModel):
    name: str | None = None
    sku: str | None = None
    category: str | None = None
    description: str | None = None

    cost_price: Decimal | None = None
    selling_price: Decimal | None = None

    stock_quantity: int | None = None
    minimum_stock: int | None = None

    is_active: bool | None = None


class ProductRead(BaseModel):
    id: int

    name: str
    sku: str

    category: str | None
    description: str | None

    cost_price: Decimal
    selling_price: Decimal

    stock_quantity: int
    minimum_stock: int

    is_active: bool

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
