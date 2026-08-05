from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


# ------------------------
# Existing Dashboard Summary
# ------------------------

class DashboardTodayResponse(BaseModel):
    today_sales: Decimal
    today_appointments: int
    expected_revenue: Decimal
    customers: int
    employees: int
    products: int
    low_stock: int
    pending_invoices: int
    paid_invoices: int
class RecentAppointmentResponse(BaseModel):
    id: int
    appointment_time: datetime
    customer_name: str
    employee_name: str
    service_name: str
    status: str

# ------------------------
# Dashboard Widgets
# ------------------------

class RecentAppointmentResponse(BaseModel):
    id: int
    customer_name: str
    employee_name: str
    service_name: str
    appointment_time: datetime
    status: str


class RecentInvoiceResponse(BaseModel):
    id: int
    invoice_number: str
    customer_name: str
    total: Decimal
    status: str
    created_at: datetime


class LowStockProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    stock_quantity: int
    minimum_stock: int


class TopServiceResponse(BaseModel):
    service_name: str
    appointment_count: int


# ------------------------
# Dashboard V2 Response
# ------------------------

class DashboardResponse(BaseModel):
    summary: DashboardTodayResponse
    recent_appointments: list[RecentAppointmentResponse]
    recent_invoices: list[RecentInvoiceResponse]
    low_stock_products: list[LowStockProductResponse]
    top_services: list[TopServiceResponse]
