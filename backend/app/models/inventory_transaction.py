from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.core.database import Base


class InventoryTransaction(Base):

    __tablename__ = "inventory_transactions"


    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )


    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"),
        nullable=False,
    )


    transaction_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    # stock_in
    # stock_out
    # adjustment


    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )


    note: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )


    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )


    product = relationship(
        "Product",
        back_populates="inventory_transactions",
    )
