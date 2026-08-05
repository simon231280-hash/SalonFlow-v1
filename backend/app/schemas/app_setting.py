from pydantic import BaseModel


class AppSettingsUpdate(BaseModel):
    salon_name: str
    phone: str | None = None
    email: str | None = None
    address: str | None = None
    currency: str = "MMK"
    tax_percent: float = 0
    receipt_footer: str | None = None


class AppSettingsResponse(AppSettingsUpdate):
    pass
