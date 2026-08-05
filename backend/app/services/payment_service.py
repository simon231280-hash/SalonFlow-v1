from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.invoice import Invoice
from app.models.payment import Payment
from app.models.product import Product
from app.models.invoice_product_item import InvoiceProductItem

from app.schemas.payment import (
    PaymentCreate,
    PaymentUpdate,
)


class PaymentService:

    @staticmethod
    async def create(
        db: AsyncSession,
        payment_data: PaymentCreate,
    ) -> Payment:

        invoice_result = await db.execute(
            select(Invoice)
            .options(
                selectinload(Invoice.payments)
            )
            .where(
                Invoice.id == payment_data.invoice_id
            )
        )

        invoice = invoice_result.scalar_one_or_none()

        if invoice is None:
            raise ValueError(
                "Invoice not found."
            )

        paid_amount = sum(
            Decimal(str(payment.amount))
            for payment in invoice.payments
        )

        remaining = (
            Decimal(str(invoice.total))
            - paid_amount
        )

        if Decimal(str(payment_data.amount)) > remaining:
            raise ValueError(
                "Payment exceeds remaining balance."
            )

        payment = Payment(
            invoice_id=payment_data.invoice_id,
            amount=payment_data.amount,
            payment_method=payment_data.payment_method,
            reference_number=payment_data.reference_number,
            notes=payment_data.notes,
        )

        db.add(payment)

        await db.commit()

        await db.refresh(payment)

        await PaymentService._update_invoice_status(
            db,
            invoice.id,
        )

        return await PaymentService.get_by_id(
            db,
            payment.id,
        )


    @staticmethod
    async def get_all(
        db: AsyncSession,
    ) -> list[Payment]:

        result = await db.execute(
            select(Payment)
            .options(
                selectinload(Payment.invoice)
            )
        )

        return result.scalars().all()


    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        payment_id: int,
    ) -> Payment | None:

        result = await db.execute(
            select(Payment)
            .options(
                selectinload(Payment.invoice)
            )
            .where(
                Payment.id == payment_id
            )
        )

        return result.scalar_one_or_none()


    @staticmethod
    async def update(
        db: AsyncSession,
        db_payment: Payment,
        payment_data: PaymentUpdate,
    ) -> Payment:

        data = payment_data.model_dump(
            exclude_unset=True
        )

        for key, value in data.items():
            setattr(
                db_payment,
                key,
                value,
            )

        await db.commit()

        return await PaymentService.get_by_id(
            db,
            db_payment.id,
        )


    @staticmethod
    async def delete(
        db: AsyncSession,
        db_payment: Payment,
    ) -> None:

        invoice_id = db_payment.invoice_id

        await db.delete(
            db_payment
        )

        await db.commit()

        await PaymentService._update_invoice_status(
            db,
            invoice_id,
        )


    @staticmethod
    async def _update_invoice_status(
        db: AsyncSession,
        invoice_id: int,
    ) -> None:

        invoice_result = await db.execute(
            select(Invoice)
            .options(
                selectinload(Invoice.payments)
            )
            .where(
                Invoice.id == invoice_id
            )
        )

        invoice = invoice_result.scalar_one()

        paid = await PaymentService.get_total_paid(
        db,
        invoice.id,
)

        total = Decimal(str(invoice.total))

        print("========== PAYMENT DEBUG ==========")
        print("Invoice ID:", invoice.id)
        print("Total:", total)
        print("Paid:", paid)
        print("Status before:", invoice.status)

        if total == Decimal("0.00"):
            invoice.status = "paid"

        elif paid == Decimal("0.00"):
            invoice.status = "pending"

        elif paid < total:
            invoice.status = "partial"

        else:
            invoice.status = "paid"

            if not invoice.stock_deducted:
                await PaymentService._deduct_product_stock(
                    db,
                    invoice,
                )
                invoice.stock_deducted = True

        print("Status after:", invoice.status)

        await db.commit()

        print("Committed")
        print("===================================")



    @staticmethod
    async def _deduct_product_stock(
        db: AsyncSession,
        invoice: Invoice,
    ) -> None:

        result = await db.execute(
            select(InvoiceProductItem)
            .where(
                InvoiceProductItem.invoice_id == invoice.id
            )
        )

        items = result.scalars().all()

        for item in items:

            product = await db.get(
                Product,
                item.product_id,
            )

            if product:
                product.stock_quantity -= item.quantity

        await db.commit()


    @staticmethod
    async def get_total_paid(
        db: AsyncSession,
        invoice_id: int,
    ) -> Decimal:

        result = await db.execute(
            select(
                func.coalesce(
                    func.sum(Payment.amount),
                    0,
                )
            ).where(
                Payment.invoice_id == invoice_id
            )
        )

        return Decimal(
            str(result.scalar_one())
        )
