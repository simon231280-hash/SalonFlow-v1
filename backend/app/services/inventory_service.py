from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.product import Product
from app.models.inventory_transaction import InventoryTransaction

from app.schemas.inventory_transaction import (
    InventoryTransactionCreate,
)


class InventoryService:


    @staticmethod
    async def create_transaction(
        db: AsyncSession,
        data: InventoryTransactionCreate,
    ) -> InventoryTransaction:


        result = await db.execute(
            select(Product).where(
                Product.id == data.product_id
            )
        )

        product = result.scalar_one_or_none()


        if not product:
            raise ValueError("Product not found")


        if data.transaction_type == "stock_in":

            product.stock_quantity += data.quantity


        elif data.transaction_type == "stock_out":

            if product.stock_quantity < data.quantity:
                raise ValueError(
                    "Not enough stock available"
                )

            product.stock_quantity -= data.quantity


        elif data.transaction_type == "adjustment":

            product.stock_quantity = data.quantity


        else:
            raise ValueError(
                "Invalid transaction type"
            )


        transaction = InventoryTransaction(
            product_id=data.product_id,
            transaction_type=data.transaction_type,
            quantity=data.quantity,
            note=data.note,
        )


        db.add(transaction)

        await db.commit()

        await db.refresh(transaction)


        return transaction



    @staticmethod
    async def get_transactions(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(InventoryTransaction)
            .order_by(
                InventoryTransaction.created_at.desc()
            )
        )

        return result.scalars().all()



    @staticmethod
    async def get_product_transactions(
        db: AsyncSession,
        product_id: int,
    ):

        result = await db.execute(
            select(InventoryTransaction)
            .where(
                InventoryTransaction.product_id == product_id
            )
            .order_by(
                InventoryTransaction.created_at.desc()
            )
        )

        return result.scalars().all()
