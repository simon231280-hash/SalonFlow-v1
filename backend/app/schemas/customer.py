from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class CustomerCreate(BaseModel):
    first_name: str
    last_name: str | None = None
    gender: str | None = None
    phone: str
    email: EmailStr | None = None
    date_of_birth: date | None = None
    address: str | None = None
    notes: str | None = None


class CustomerUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    gender: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    date_of_birth: date | None = None
    address: str | None = None
    notes: str | None = None
    is_active: bool | None = None


class CustomerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str | None
    gender: str | None
    phone: str
    email: str | None
    date_of_birth: date | None
    address: str | None
    notes: str | None
    is_active: bool
    created_by: int
    created_at: datetime
    updated_at: datetime
