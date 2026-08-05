from fastapi import HTTPException

from app.models.appointment import Appointment
from app.models.invoice import Invoice
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CustomerService:

    @staticmethod
    async def create_customer(
        db: AsyncSession,
        customer: CustomerCreate,
        user_id: int,
    ) -> Customer:

        new_customer = Customer(
            **customer.model_dump(),
            created_by=user_id,
        )

        db.add(new_customer)

        await db.commit()
        await db.refresh(new_customer)

        return new_customer

    @staticmethod
    async def get_customers(
        db: AsyncSession,
        page: int = 1,
        page_size: int = 20,
        search: str | None = None,
    ) -> list[Customer]:

        query = select(Customer).where(
            Customer.is_active == True
        )

        if search:
            query = query.where(
                or_(
                    Customer.first_name.ilike(f"%{search}%"),
                    Customer.last_name.ilike(f"%{search}%"),
                    Customer.phone.ilike(f"%{search}%"),
                )
            )

        query = query.offset(
            (page - 1) * page_size
        ).limit(page_size)

        result = await db.execute(query)

        return result.scalars().all()


    @staticmethod
    async def get_customer(
        db: AsyncSession,
        customer_id: int,
    ) -> Customer | None:

        result = await db.execute(
            select(Customer)
            .where(Customer.id == customer_id)
        )

        return result.scalar_one_or_none()


    @staticmethod
    async def update_customer(
        db: AsyncSession,
        customer: Customer,
        customer_data: CustomerUpdate,
    ) -> Customer:

        update_data = customer_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(customer, key, value)

        await db.commit()
        await db.refresh(customer)

        return customer

    @staticmethod
    async def delete_customer(
        db: AsyncSession,
        customer: Customer,
    ) -> None:

        appointment_exists = await db.scalar(
            select(Appointment.id).where(
                Appointment.customer_id == customer.id
            )
        )

        if appointment_exists:
            raise HTTPException(
                status_code=400,
                detail="Customer has appointments and cannot be deleted.",
            )

        invoice_exists = await db.scalar(
            select(Invoice.id).where(
                Invoice.customer_id == customer.id
            )
        )

        if invoice_exists:
            raise HTTPException(
                status_code=400,
                detail="Customer has invoices and cannot be deleted.",
            )

        await db.delete(customer)
        await db.commit()
    
