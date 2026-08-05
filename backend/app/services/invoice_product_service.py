from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.invoice import Invoice
from app.models.product import Product
from app.models.invoice_product_item import InvoiceProductItem
from app.models.inventory_transaction import InventoryTransaction


class InvoiceProductService:

    @staticmethod
    async def add_product(
        db: AsyncSession,
        invoice_id: int,
        product_id: int,
        quantity: int,
    ) -> InvoiceProductItem:

        invoice = await db.get(
            Invoice,
            invoice_id,
        )

        if invoice is None:
            raise ValueError(
                "Invoice not found."
            )

        product = await db.get(
            Product,
            product_id,
        )

        if product is None:
            raise ValueError(
                "Product not found."
            )

        if quantity <= 0:
            raise ValueError(
                "Quantity must be greater than zero."
            )

        if product.stock_quantity < quantity:
            raise ValueError(
                "Not enough stock."
            )

        total_price = (
            Decimal(product.selling_price)
            * quantity
        )

        invoice_item = InvoiceProductItem(
            invoice_id=invoice.id,
            product_id=product.id,
            quantity=quantity,
            unit_price=product.selling_price,
            total_price=total_price,
        )

        db.add(invoice_item)

        # Reduce stock
        product.stock_quantity -= quantity

        # Record inventory movement
        db.add(
            InventoryTransaction(
                product_id=product.id,
                transaction_type="stock_out",
                quantity=quantity,
                note=f"Invoice #{invoice.invoice_number}",
            )
        )

        # Update invoice totals
        invoice.subtotal += total_price
        invoice.total += total_price

        await db.commit()
        await db.refresh(invoice_item)

        return invoice_item
