from app.models.appointment import Appointment
from datetime import date, datetime, time
from decimal import Decimal
from app.models.appointment_service import AppointmentService
from app.models.service import Service
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.invoice_product_item import InvoiceProductItem
from app.models.invoice import Invoice
from app.models.payment import Payment
from app.models.product import Product
from app.models.employee import Employee
from app.models.inventory_transaction import InventoryTransaction
from sqlalchemy.orm import selectinload
from app.models.customer import Customer


class ReportService:
    @staticmethod
    async def get_service_sales(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(
                Service.name.label("service_name"),
                func.count(
                    AppointmentService.id
                ).label("total_bookings"),
                func.sum(
                    AppointmentService.price
                ).label("total_revenue"),
            )
            .join(
                AppointmentService,
                AppointmentService.service_id == Service.id,
            )
            .group_by(
                Service.id,
                Service.name,
            )
            .order_by(
                func.sum(
                    AppointmentService.price
                ).desc()
            )
        )

        rows = result.all()

        return [
            {
                "service_name": row.service_name,
                "total_bookings": row.total_bookings,
                "total_revenue": row.total_revenue
                or Decimal("0.00"),
            }
            for row in rows
        ]
    @staticmethod
    async def get_stock_movements(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(InventoryTransaction)
            .options(
                selectinload(
                    InventoryTransaction.product
                )
            )
            .order_by(
                InventoryTransaction.created_at.desc()
            )
        )

        transactions = result.scalars().all()

        return [
            {
                "product_name": t.product.name,
                "transaction_type": t.transaction_type,
                "quantity": t.quantity,
                "note": t.note,
                "created_at": t.created_at,
            }
            for t in transactions
        ]
    @staticmethod
    async def get_frequent_customers(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(
                Customer.id.label("customer_id"),
                Customer.first_name,
                Customer.last_name,
                func.count(
                    Appointment.id
                ).label("total_visits"),
            )
            .join(
                Appointment,
                Appointment.customer_id == Customer.id,
            )
            .group_by(
                Customer.id,
                Customer.first_name,
                Customer.last_name,
            )
            .order_by(
                func.count(
                    Appointment.id
                ).desc()
            )
        )

        rows = result.all()

        return [
            {
                "customer_id": row.customer_id,
                "customer_name": f"{row.first_name} {row.last_name}",
                "total_visits": row.total_visits,
            }
            for row in rows
        ]
    
    @staticmethod
    async def get_top_customers(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(
                Customer.id.label("customer_id"),
                Customer.first_name,
                Customer.last_name,
                func.count(
                    Invoice.id
                ).label("total_visits"),
                func.coalesce(
                    func.sum(
                        Invoice.total
                    ),
                    Decimal("0.00"),
                ).label("total_spent"),
            )
            .join(
                Invoice,
                Invoice.customer_id == Customer.id,
            )
            .group_by(
                Customer.id,
                Customer.first_name,
                Customer.last_name,
            )
            .order_by(
                func.sum(
                    Invoice.total
                ).desc()
            )
        )

        rows = result.all()

        return [
            {
                "customer_id": row.customer_id,
                "customer_name": f"{row.first_name} {row.last_name}",
                "total_visits": row.total_visits,
                "total_spent": row.total_spent,
            }
            for row in rows
        ]
    @staticmethod
    async def get_customer_history(
        db: AsyncSession,
        customer_id: int,
    ):

        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(Appointment.employee),
                selectinload(Appointment.invoice),
            )
            .where(
                Appointment.customer_id == customer_id
            )
            .order_by(
                Appointment.appointment_time.desc()
            )
        )

        appointments = result.scalars().all()

        return [
            {
                "appointment_id": appointment.id,
                "appointment_time": appointment.appointment_time,
                "employee_name": (
                    f"{appointment.employee.first_name} "
                    f"{appointment.employee.last_name}"
                ),
                "status": appointment.status,
                "invoice_total": (
                    appointment.invoice.total
                    if appointment.invoice
                    else None
                ),
            }
            for appointment in appointments
        ]
    @staticmethod
    async def get_customer_lifetime_value(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(
                Customer.id.label("customer_id"),
                Customer.first_name,
                Customer.last_name,
                func.count(Invoice.id).label("total_visits"),
                func.coalesce(
                    func.sum(Invoice.total),
                    Decimal("0.00"),
                ).label("total_spent"),
                func.min(
                    Appointment.appointment_time
                ).label("first_visit"),
                func.max(
                    Appointment.appointment_time
                ).label("last_visit"),
            )
            .join(
                Invoice,
                Invoice.customer_id == Customer.id,
            )
            .join(
                Appointment,
                Appointment.customer_id == Customer.id,
            )
            .group_by(
                Customer.id,
                Customer.first_name,
                Customer.last_name,
            )
            .order_by(
                func.sum(Invoice.total).desc()
            )
        )

        rows = result.all()

        report = []

        for row in rows:

            average = (
                row.total_spent / row.total_visits
                if row.total_visits
                else Decimal("0.00")
            )

            report.append(
                {
                    "customer_id": row.customer_id,
                    "customer_name": f"{row.first_name} {row.last_name}",
                    "total_visits": row.total_visits,
                    "total_spent": row.total_spent,
                    "average_spent": average,
                    "first_visit": row.first_visit,
                    "last_visit": row.last_visit,
                }
            )

        return report
    @staticmethod
    async def get_new_customers(
        db: AsyncSession,
        year: int,
        month: int,
    ):

        start = datetime(
            year,
            month,
            1,
        )

        if month == 12:
            end = datetime(
                year + 1,
                1,
                1,
            )
        else:
            end = datetime(
                year,
                month + 1,
                1,
            )

        count = await db.scalar(
            select(
                func.count(Customer.id)
            ).where(
                Customer.created_at >= start,
                Customer.created_at < end,
            )
        )

        return {
            "year": year,
            "month": month,
            "new_customers": count or 0,
        }
    @staticmethod
    async def get_inventory_valuation(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(Product)
            .order_by(Product.name)
        )

        products = result.scalars().all()

        report = []

        for product in products:

            unit_price = Decimal(product.selling_price)
            stock_quantity = product.stock_quantity
            stock_value = (
                unit_price * Decimal(stock_quantity)
            )

            report.append(
                {
                    "product_id": product.id,
                    "product_name": product.name,
                    "stock_quantity": stock_quantity,
                    "unit_price": unit_price,
                    "stock_value": stock_value,
                }
            )

        return report

    @staticmethod
    async def get_employee_sales(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(
                Employee.id.label("employee_id"),
                Employee.first_name.label("first_name"),
                Employee.last_name.label("last_name"),
                func.count(
                    Appointment.id.distinct()
                ).label("completed_appointments"),
                func.coalesce(
                    func.sum(
                        AppointmentService.price
                    ),
                    Decimal("0.00"),
                ).label("total_revenue"),
            )
            .join(
                Appointment,
                Appointment.employee_id == Employee.id,
            )
            .join(
                AppointmentService,
                AppointmentService.appointment_id == Appointment.id,
            )
            .where(
                Appointment.status == "completed"
            )
            .group_by(
                Employee.id,
                Employee.first_name,
                Employee.last_name,
            )
            .order_by(
                func.coalesce(
                    func.sum(
                        AppointmentService.price
                    ),
                    0,
                ).desc()
            )
        )

        rows = result.all()

        return [
            {
                "employee_id": row.employee_id,
                "employee_name": f"{row.first_name} {row.last_name}",
                "completed_appointments": row.completed_appointments,
                "total_revenue": row.total_revenue,
            }
            for row in rows
        ]
           

    @staticmethod
    async def get_daily_sales(
        db: AsyncSession,
        report_date: date | None = None,
    ):

        if report_date is None:
            report_date = date.today()

        start = datetime.combine(
            report_date,
            time.min,
        )

        end = datetime.combine(
            report_date,
            time.max,
        )

        # Payments made today
        payment_result = await db.execute(
            select(Payment).where(
                Payment.created_at >= start,
                Payment.created_at <= end,
            )
        )

        payments = payment_result.scalars().all()

        total_sales = sum(
            Decimal(payment.amount)
            for payment in payments
        )

        payment_count = len(payments)

        # Invoices created today
        invoice_count = await db.scalar(
            select(func.count(Invoice.id)).where(
                Invoice.created_at >= start,
                Invoice.created_at <= end,
            )
        )

        return {
            "date": report_date,
            "total_sales": total_sales,
            "invoice_count": invoice_count,
            "payment_count": payment_count,
        }
    @staticmethod
    async def get_product_sales(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(
                Product.name.label("product_name"),
                func.coalesce(
                    func.sum(
                        InvoiceProductItem.quantity
                    ),
                    0,
                ).label("units_sold"),
                func.coalesce(
                    func.sum(
                        InvoiceProductItem.total_price
                    ),
                    Decimal("0.00"),
                ).label("total_revenue"),
                Product.stock_quantity.label(
                    "current_stock"
                ),
            )
            .outerjoin(
                InvoiceProductItem,
                InvoiceProductItem.product_id
                == Product.id,
            )
            .group_by(
                Product.id,
                Product.name,
                Product.stock_quantity,
            )
            .order_by(
                func.coalesce(
                    func.sum(
                        InvoiceProductItem.total_price
                    ),
                    0,
                ).desc()
            )
        )

        rows = result.all()

        return [
            {
                "product_name": row.product_name,
                "units_sold": row.units_sold,
                "total_revenue": row.total_revenue,
                "current_stock": row.current_stock,
            }
            for row in rows
        ]
    @staticmethod
    async def get_low_stock(
        db: AsyncSession,
    ):

        result = await db.execute(
            select(Product)
            .where(
                Product.stock_quantity <= Product.minimum_stock
            )
            .order_by(Product.stock_quantity.asc())
        )

        products = result.scalars().all()

        return [
            {
                "product_id": p.id,
                "product_name": p.name,
                "current_stock": p.stock_quantity,
                "minimum_stock": p.minimum_stock,
            }
            for p in products
        ]

    @staticmethod
    async def get_monthly_sales(
        db: AsyncSession,
        year: int,
        month: int,
    ):

        start = datetime(
            year,
            month,
            1,
        )

        if month == 12:
            end = datetime(
                year + 1,
                1,
                1,
            )
        else:
            end = datetime(
                year,
                month + 1,
                1,
            )

        total_sales = await db.scalar(
    select(
        func.coalesce(
            func.sum(Payment.amount),
            0,
        )
    ).where(
        Payment.created_at >= start,
        Payment.created_at < end,
        )
    )

        payment_count = await db.scalar(
            select(
                func.count(Payment.id)
            ).where(
        Payment.created_at >= start,
        Payment.created_at < end,
        )
    )

        invoice_count = await db.scalar(
            select(func.count(Invoice.id)).where(
                Invoice.created_at >= start,
                Invoice.created_at < end,
            )
        )

        return {
            "year": year,
            "month": month,
            "total_sales": total_sales,
            "invoice_count": invoice_count,
            "payment_count": payment_count,
        }

