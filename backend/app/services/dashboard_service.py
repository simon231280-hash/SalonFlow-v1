from datetime import date
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.employee import Employee
from app.models.appointment import Appointment
from app.models.customer import Customer
from app.models.invoice import Invoice
from app.models.payment import Payment
from app.models.product import Product


class DashboardService:

    @staticmethod
    async def get_today_dashboard(
        db: AsyncSession,
    ):

        today = date.today()

        # Today's appointments
        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(
                    Appointment.appointment_services
                )
            )
            .where(
                func.date(
                    Appointment.appointment_time
                ) == today
            )
        )

        appointments = result.scalars().all()

        # Today's payments
        today_sales = await db.scalar(
            select(
                func.coalesce(
                    func.sum(Payment.amount),
                    0,
                )
            ).where(
                func.date(
                    Payment.created_at
                ) == today
            )
        )

        expected_revenue = Decimal("0.00")

        for appointment in appointments:
            for service in appointment.appointment_services:
                expected_revenue += Decimal(
                    service.price
                )

        customer_count = await db.scalar(
            select(
                func.count(Customer.id)
            )
        )
        employee_count = await db.scalar(
            select(
                func.count(Employee.id)
            )
        )

        product_count = await db.scalar(
            select(
                func.count(Product.id)
            )
        )

        low_stock_count = await db.scalar(
            select(
                func.count(Product.id)
            ).where(
                Product.stock_quantity
                <= Product.minimum_stock
            )
        )

        pending_invoice_count = await db.scalar(
            select(
                func.count(Invoice.id)
            ).where(
                Invoice.status == "pending"
            )
        )

        paid_invoice_count = await db.scalar(
            select(
                func.count(Invoice.id)
            ).where(
                Invoice.status == "paid"
            )
        )

        return {
            "today_sales": today_sales,
            "today_appointments": len(
                appointments
            ),
            "expected_revenue": expected_revenue,
            "customers": customer_count,
            "employees": employee_count,
            "products": product_count,
            "low_stock": low_stock_count,
            "pending_invoices": pending_invoice_count,
            "paid_invoices": paid_invoice_count,
        }
