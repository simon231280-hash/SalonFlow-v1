from datetime import date, datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.appointment import Appointment


router = APIRouter(
    prefix="/calendar",
    tags=["Calendar"],
)


@router.get("/day")
async def get_day_calendar(
    target_date: date,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    start = datetime.combine(
        target_date,
        datetime.min.time(),
    )

    end = datetime.combine(
        target_date,
        datetime.max.time(),
    )


    result = await db.execute(
        select(Appointment)
        .options(
            selectinload(Appointment.customer),
            selectinload(Appointment.employee),
            selectinload(
                Appointment.appointment_services
            ),
        )
        .where(
            Appointment.appointment_time >= start,
            Appointment.appointment_time <= end,
        )
        .order_by(
            Appointment.appointment_time
        )
    )


    appointments = result.scalars().all()


    return [
        {
            "id": appointment.id,

            "customer":
                f"{appointment.customer.first_name} {appointment.customer.last_name}",

            "employee":
                f"{appointment.employee.first_name} {appointment.employee.last_name}",

            "start":
                appointment.appointment_time,

            "end":
                appointment.end_time,

            "status":
                appointment.status,
        }

        for appointment in appointments
    ]
