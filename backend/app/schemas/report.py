from datetime import date
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel

class CustomerLifetimeValueReport(BaseModel):
    customer_id: int
    customer_name: str
    total_visits: int
    total_spent: Decimal
    average_spent: Decimal
    first_visit: datetime | None
    last_visit: datetime | None
class CustomerVisitReport(BaseModel):
    appointment_id: int
    appointment_time: datetime
    employee_name: str
    status: str
    invoice_total: Decimal | None
class NewCustomersReport(BaseModel):
    year: int
    month: int
    new_customers: int
class FrequentCustomerReport(BaseModel):
    customer_id: int
    customer_name: str
    total_visits: int
class TopCustomerReport(BaseModel):
    customer_id: int
    customer_name: str
    total_visits: int
    total_spent: Decimal
class InventoryValuationReport(BaseModel):
    product_id: int
    product_name: str
    stock_quantity: int
    unit_price: Decimal
    stock_value: Decimal
class StockMovementReport(BaseModel):
    product_name: str
    transaction_type: str
    quantity: int
    note: str | None
    created_at: datetime
class LowStockReport(BaseModel):
    product_id: int
    product_name: str
    current_stock: int
    minimum_stock: int
class EmployeeSalesReport(BaseModel):
    employee_id: int
    employee_name: str
    completed_appointments: int
    total_revenue: Decimal
class ProductSalesReport(BaseModel):
    product_name: str
    units_sold: int
    total_revenue: Decimal
    current_stock: int
class ServiceSalesReport(BaseModel):
    service_name: str
    total_bookings: int
    total_revenue: Decimal
class DailySalesReport(BaseModel):
    date: date
    total_sales: Decimal
    invoice_count: int
    payment_count: int
class MonthlySalesReport(BaseModel):
    year: int
    month: int

    total_sales: Decimal

    invoice_count: int
    payment_count: int


