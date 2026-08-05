from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: SecretStr

    full_name: str | None = None
    phone: str | None = None

    role: str = "staff"


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    phone: str | None = None
    role: str | None = None
    is_active: bool | None = None


class UserPasswordUpdate(BaseModel):
    password: SecretStr


class UserResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    username: str
    email: EmailStr
    full_name: str | None
    phone: str | None
    role: str
    is_active: bool
