from datetime import datetime, timedelta
from app.core.enums import AppointmentStatus
from sqlalchemy import and_, select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.appointment import Appointment
from app.models.service import Service
from app.models.appointment_service import (
    AppointmentService as AppointmentServiceModel,
)

from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentUpdate,
)


class AppointmentService:

    @staticmethod
    async def create(
        db: AsyncSession,
        appointment: AppointmentCreate,
        user_id: int,
    ) -> Appointment:

        services_result = await db.execute(
            select(Service).where(
                Service.id.in_(appointment.service_ids)
            )
        )

        services = services_result.scalars().all()

        if len(services) != len(appointment.service_ids):
            raise ValueError(
                "One or more services were not found"
            )

        appointment_time = appointment.appointment_time.replace(
            tzinfo=None
        )

        total_duration = sum(
            service.duration_minutes
            for service in services
        )

        end_time = appointment_time + timedelta(
            minutes=total_duration
        )

        conflict_result = await db.execute(
            select(Appointment).where(
                and_(
                    Appointment.employee_id == appointment.employee_id,
                    Appointment.appointment_time < end_time,
                    Appointment.end_time > appointment_time,
                )
            )
        )

        existing = conflict_result.scalars().first()

        if existing:
            raise ValueError(
                "Employee already has an appointment during this time."
            )

        new_appointment = Appointment(
            customer_id=appointment.customer_id,
            employee_id=appointment.employee_id,
            user_id=user_id,
            appointment_time=appointment_time,
            end_time=end_time,
            notes=appointment.notes,
        )

        db.add(new_appointment)

        await db.flush()

        for service in services:
            db.add(
                AppointmentServiceModel(
                    appointment_id=new_appointment.id,
                    service_id=service.id,
                    price=service.price,
                    duration_minutes=service.duration_minutes,
                )
            )

        await db.commit()

        return await AppointmentService.get_by_id(
            db,
            new_appointment.id,
        )


    @staticmethod
    async def get_all(
        db: AsyncSession,
    ) -> list[Appointment]:

        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(Appointment.customer),
                selectinload(Appointment.employee),
                selectinload(
                    Appointment.appointment_services
                ).selectinload(
                    AppointmentServiceModel.service
                ),
            )
        )

        return result.scalars().all()


    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        appointment_id: int,
    ) -> Appointment | None:

        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(Appointment.customer),
                selectinload(Appointment.employee),
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

        return result.scalar_one_or_none()


    @staticmethod
    async def get_customer_history(
        db: AsyncSession,
        customer_id: int,
    ) -> list[Appointment]:

        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(Appointment.customer),
                selectinload(Appointment.employee),
                selectinload(
                    Appointment.appointment_services
                ).selectinload(
                    AppointmentServiceModel.service
                ),
            )
            .where(
                Appointment.customer_id == customer_id
            )
            .order_by(
                Appointment.appointment_time.desc()
            )
        )

        return result.scalars().all()


    @staticmethod
    async def get_employee_schedule(
        db: AsyncSession,
        employee_id: int,
        schedule_date,
    ) -> list[Appointment]:

        start_datetime = datetime.combine(
            schedule_date,
            datetime.min.time(),
        )

        end_datetime = datetime.combine(
            schedule_date,
            datetime.max.time(),
        )

        result = await db.execute(
            select(Appointment)
            .options(
                selectinload(Appointment.customer),
                selectinload(Appointment.employee),
                selectinload(
                    Appointment.appointment_services
                ).selectinload(
                    AppointmentServiceModel.service
                ),
            )
            .where(
                Appointment.employee_id == employee_id,
                Appointment.appointment_time >= start_datetime,
                Appointment.appointment_time <= end_datetime,
            )
            .order_by(
                Appointment.appointment_time
            )
        )

        return result.scalars().all()


    @staticmethod
    async def update(
        db: AsyncSession,
        db_appointment: Appointment,
        appointment: AppointmentUpdate,
    ) -> Appointment:

        data = appointment.model_dump(
            exclude_unset=True
        )

        for key, value in data.items():
            setattr(
                db_appointment,
                key,
                value,
            )

        await db.commit()

        return await AppointmentService.get_by_id(
            db,
            db_appointment.id,
        

        )
    @staticmethod
    async def update_status(
        db: AsyncSession,
        appointment: Appointment,
        status: AppointmentStatus,
    ) -> Appointment:

        appointment.status = status

        await db.commit()

        return await AppointmentService.get_by_id(
            db,
            appointment.id,
        )


    @staticmethod
    async def delete(
        db: AsyncSession,
        db_appointment: Appointment,
    ) -> None:

        await db.delete(db_appointment)

        await db.commit()
