from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from datetime import date

from app.schemas.appointment import (
    AppointmentScheduleResponse,
)
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentResponse,
    AppointmentUpdate,
    AppointmentStatusUpdate,
)
from app.services.appointment_service import AppointmentService

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
)


@router.post(
    "/",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_appointment(
    appointment: AppointmentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return await AppointmentService.create(
            db,
            appointment,
            current_user.id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/",
    response_model=list[AppointmentResponse],
)
async def get_appointments(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AppointmentService.get_all(db)


@router.get(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
async def get_appointment(
    appointment_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    appointment = await AppointmentService.get_by_id(
        db,
        appointment_id,
    )

    if appointment is None:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    return appointment


@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
async def update_appointment(
    appointment_id: int,
    appointment: AppointmentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_appointment = await AppointmentService.get_by_id(
        db,
        appointment_id,
    )

    if db_appointment is None:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    return await AppointmentService.update(
        db,
        db_appointment,
        appointment,
    )
@router.patch(
    "/{appointment_id}/status",
    response_model=AppointmentResponse,
)
async def update_status(
    appointment_id: int,
    body: AppointmentStatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    appointment = await AppointmentService.get_by_id(
        db,
        appointment_id,
    )

    if appointment is None:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    return await AppointmentService.update_status(
        db,
        appointment,
        body.status,
    )

@router.delete(
    "/{appointment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_appointment(
    appointment_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_appointment = await AppointmentService.get_by_id(
        db,
        appointment_id,
    )

    if db_appointment is None:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    await AppointmentService.delete(
        db,
        db_appointment,
    )
@router.get(
    "/employee/{employee_id}",
    response_model=list[AppointmentScheduleResponse],
)
async def employee_schedule(
    employee_id: int,
    date: date,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AppointmentService.get_employee_schedule(
        db,
        employee_id,
        date,
    )
