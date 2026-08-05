from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    gender: str
    phone: str
    email: EmailStr | None = None
    position: str
    salary: float
    hire_date: date
    is_active: bool = True


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    gender: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    position: str | None = None
    salary: float | None = None
    hire_date: date | None = None
    is_active: bool | None = None


class EmployeeResponse(EmployeeBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
