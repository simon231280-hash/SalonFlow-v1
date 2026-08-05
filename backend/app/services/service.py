from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ServiceBase(BaseModel):
    name: str
    category: str
    duration_minutes: int
    price: float
    description: str | None = None
    is_active: bool = True


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    duration_minutes: int | None = None
    price: float | None = None
    description: str | None = None
    is_active: bool | None = None


class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
