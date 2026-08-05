from datetime import datetime
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.product import Product
from app.models.invoice_product_item import InvoiceProductItem
from app.schemas.invoice_product_item import (
    InvoiceProductItemCreate,
)
from app.models.appointment import Appointment
from app.models.appointment_service import (
    AppointmentService as AppointmentServiceModel,
)
from app.models.invoice import Invoice
from app.models.invoice_item import InvoiceItem
from app.schemas.invoice import (
    InvoiceRead,
    InvoiceUpdate,
)


class InvoiceService:

    @staticmethod
    async def _generate_invoice_number(
        db: AsyncSession,
    ) -> str:

        today = datetime.now().strftime("%Y%m%d")

        result = await db.execute(
            select(
                func.count(Invoice.id)
            ).where(
                Invoice.invoice_number.like(
                    f"{today}-%"
                )
            )
        )

        count = result.scalar_one()

        return f"{today}-{count + 1:04d}"
    @staticmethod
    async def add_product(
        db: AsyncSession,
        invoice_id: int,
        product_data: InvoiceProductItemCreate,
    ) -> InvoiceRead:

        invoice_result = await db.execute(
            select(Invoice)
            .options(
                selectinload(Invoice.product_items)
            )
            .where(
                Invoice.id == invoice_id
            )
        )

        invoice = invoice_result.scalar_one_or_none()

        if invoice is None:
            raise ValueError(
                "Invoice not found."
            )

        product_result = await db.execute(
            select(Product)
            .where(
                Product.id == product_data.product_id
            )
        )

        product = product_result.scalar_one_or_none()

        if product is None:
            raise ValueError(
                "Product not found."
            )

        item_total = (
            product.selling_price
            * product_data.quantity
        )

        invoice.product_items.append(
            InvoiceProductItem(
                product_id=product.id,
                quantity=product_data.quantity,
                unit_price=product.selling_price,
                total_price=item_total,
            )
        )

        invoice.subtotal += item_total
        invoice.total = (
            invoice.subtotal
            - invoice.discount
            + invoice.tax
        )

        await db.commit()

        return await InvoiceService.get_by_id(
            db,
            invoice.id,
        )

    @staticmethod
    def _calculate_subtotal(
        appointment: Appointment,
    ) -> Decimal:

        subtotal = Decimal("0.00")

        for item in appointment.appointment_services:
            subtotal += Decimal(str(item.price))

        return subtotal.quantize(
            Decimal("0.01")
        )


    @staticmethod
    def _calculate_payment_summary(
        invoice: Invoice,
    ):

        paid_amount = Decimal("0.00")

        for payment in invoice.payments:
            paid_amount += Decimal(
                str(payment.amount)
            )

        paid_amount = paid_amount.quantize(
            Decimal("0.01")
        )

        balance = (
            Decimal(str(invoice.total))
            - paid_amount
        )

        balance = balance.quantize(
            Decimal("0.01")
        )

        return (
            paid_amount,
            balance,
            len(invoice.payments),
            balance <= Decimal("0.00"),
        )


    @staticmethod
    def _to_read_schema(
        invoice: Invoice,
    ) -> InvoiceRead:

        (
            paid_amount,
            balance,
            payment_count,
            is_paid,
        ) = InvoiceService._calculate_payment_summary(
            invoice
        )

        return InvoiceRead(
            id=invoice.id,
            invoice_number=invoice.invoice_number,

            customer=invoice.customer,

            appointment_id=invoice.appointment_id,
            user_id=invoice.user_id,

            subtotal=invoice.subtotal,
            discount=invoice.discount,
            tax=invoice.tax,
            total=invoice.total,

            status=invoice.status,
            payment_method=invoice.payment_method,

            created_at=invoice.created_at,

            items=invoice.items,
            product_items=invoice.product_items,
            payments=invoice.payments,

            paid_amount=paid_amount,
            balance=balance,
            payment_count=payment_count,
            is_paid=is_paid,
        )


    @staticmethod
    async def create(
        db: AsyncSession,
        appointment_id: int,
        user_id: int,
    ) -> InvoiceRead:

        existing = await db.execute(
            select(Invoice)
            .where(
                Invoice.appointment_id == appointment_id
            )
        )

        if existing.scalar_one_or_none():
            raise ValueError(
                "Invoice already exists for this appointment."
            )

        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(
                    Appointment.appointment_services
                ).selectinload(
                    AppointmentServiceModel.service
                ),
            )
            .where(
                Appointment.id == appointment_id
            )
        )

        appointment = result.scalar_one_or_none()

        if appointment is None:
            raise ValueError(
                "Appointment not found."
            )

        invoice_number = (
            await InvoiceService._generate_invoice_number(
                db
            )
        )

        subtotal = (
            InvoiceService._calculate_subtotal(
                appointment
            )
        )

        discount = Decimal("0.00")
        tax = Decimal("0.00")

        total = (
            subtotal
            - discount
            + tax
        )

        invoice = Invoice(
            invoice_number=invoice_number,
            customer_id=appointment.customer_id,
            appointment_id=appointment.id,
            user_id=user_id,
            subtotal=subtotal,
            discount=discount,
            tax=tax,
            total=total,
            status="pending",
        )

        db.add(invoice)

        await db.flush()

        for item in appointment.appointment_services:

            db.add(
                InvoiceItem(
                    invoice_id=invoice.id,
                    service_name=item.service.name,
                    quantity=1,
                    unit_price=item.price,
                    total_price=item.price,
                )
            )

        await db.commit()

        return await InvoiceService.get_by_id(
            db,
            invoice.id,
        )


    @staticmethod
    async def get_all(
        db: AsyncSession,
    ) -> list[InvoiceRead]:

        result = await db.execute(
            select(Invoice)
            .options(
                selectinload(
                    Invoice.customer
                ),
                selectinload(
                    Invoice.appointment
                ),
                selectinload(
                    Invoice.items
                ),
                selectinload(
                    Invoice.product_items
                ).selectinload(
                    InvoiceProductItem.product
                ),
                selectinload(
                    Invoice.payments
                ),
            )
            .order_by(
                Invoice.created_at.desc()
            )
        )

        invoices = result.scalars().all()

        return [
            InvoiceService._to_read_schema(
                invoice
            )
            for invoice in invoices
        ]


    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        invoice_id: int,
    ) -> InvoiceRead | None:

        result = await db.execute(
            select(Invoice)
            .options(
                selectinload(
                    Invoice.customer
                ),
                selectinload(
                    Invoice.appointment
                ),
                selectinload(
                    Invoice.items
                ),
                selectinload(
                    Invoice.product_items
                ).selectinload(
                    InvoiceProductItem.product
                ),
                selectinload(
                    Invoice.payments
                ),
            )
            .where(
                Invoice.id == invoice_id
            )
        )

        invoice = result.scalar_one_or_none()

        if invoice is None:
            return None

        return InvoiceService._to_read_schema(
            invoice
        )


    @staticmethod
    async def update(
        db: AsyncSession,
        db_invoice: Invoice,
        invoice: InvoiceUpdate,
    ) -> InvoiceRead:

        data = invoice.model_dump(
            exclude_unset=True
        )

        for key, value in data.items():
            setattr(
                db_invoice,
                key,
                value,
            )

        await db.commit()

        return await InvoiceService.get_by_id(
            db,
            db_invoice.id,
        )


    @staticmethod
    async def delete(
        db: AsyncSession,
        db_invoice: Invoice,
    ) -> None:

        await db.delete(
            db_invoice
        )

        await db.commit()
