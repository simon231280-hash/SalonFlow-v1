from datetime import datetime

from pydantic import BaseModel, ConfigDict


class InventoryTransactionCreate(BaseModel):

    product_id: int

    transaction_type: str
    # stock_in
    # stock_out
    # adjustment

    quantity: int

    note: str | None = None



class InventoryTransactionRead(BaseModel):

    id: int

    product_id: int

    transaction_type: str

    quantity: int

    note: str | None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )
