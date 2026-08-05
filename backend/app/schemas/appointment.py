from datetime import datetime
from decimal import Decimal
from app.core.enums import AppointmentStatus
from pydantic import BaseModel, ConfigDict


class AppointmentCreate(BaseModel):
    customer_id: int
    employee_id: int
    service_ids: list[int]
    appointment_time: datetime
    notes: str | None = None


class AppointmentUpdate(BaseModel):
    customer_id: int | None = None
    employee_id: int | None = None
    service_ids: list[int] | None = None

    appointment_time: datetime | None = None
    status: AppointmentStatus | None = None
    notes: str | None = None

class AppointmentStatusUpdate(BaseModel):
    status: AppointmentStatus

class CustomerSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str


class EmployeeSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str


class ServiceSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    price: Decimal
    duration_minutes: int


class AppointmentServiceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    price: Decimal
    duration_minutes: int
    service: ServiceSummary


class AppointmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int

    customer: CustomerSummary
    employee: EmployeeSummary

    appointment_services: list[AppointmentServiceResponse]

    appointment_time: datetime
    end_time: datetime

    status: str
    notes: str | None

    created_at: datetime
    updated_at: datetime


class AppointmentScheduleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int

    customer: CustomerSummary

    appointment_time: datetime
    end_time: datetime

    status: str
    notes: str | None

    appointment_services: list[AppointmentServiceResponse]
