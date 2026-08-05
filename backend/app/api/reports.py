from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import require_admin
from app.core.database import get_db
from app.models.user import User
from app.schemas.report import DailySalesReport
from app.services.report_service import ReportService
from app.schemas.report import (
    DailySalesReport,
    MonthlySalesReport,
    ServiceSalesReport,
    ProductSalesReport,
    EmployeeSalesReport,
    LowStockReport,
    StockMovementReport,
    InventoryValuationReport,
    TopCustomerReport,
    FrequentCustomerReport,
    NewCustomersReport,
    CustomerVisitReport,
    CustomerLifetimeValueReport,
)
router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)
@router.get(
    "/customers/lifetime-value",
    response_model=list[CustomerLifetimeValueReport],
)
async def customer_lifetime_value(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_customer_lifetime_value(
        db
    )
@router.get(
    "/customers/new",
    response_model=NewCustomersReport,
)
async def new_customers(
    year: int,
    month: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_new_customers(
        db,
        year,
        month,
    )
@router.get(
    "/customers/{customer_id}/history",
    response_model=list[CustomerVisitReport],
)
async def customer_history(
    customer_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_customer_history(
        db,
        customer_id,
    )
@router.get(
    "/customers/most-frequent",
    response_model=list[FrequentCustomerReport],
)
async def most_frequent_customers(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_frequent_customers(db)
@router.get(
    "/customers/top-spenders",
    response_model=list[TopCustomerReport],
)
async def top_customers(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_top_customers(db)
@router.get(
    "/inventory/valuation",
    response_model=list[InventoryValuationReport],
)
async def inventory_valuation(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_inventory_valuation(
        db
    )
@router.get(
    "/inventory/stock-movement",
    response_model=list[StockMovementReport],
)
async def stock_movements(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_stock_movements(
        db
    )
@router.get(
    "/inventory/low-stock",
    response_model=list[LowStockReport],
)
async def low_stock(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_low_stock(db)

@router.get(
    "/sales/products",
    response_model=list[ProductSalesReport],
)
async def product_sales(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_product_sales(
        db
    )
@router.get(
    "/sales/employees",
    response_model=list[EmployeeSalesReport],
)
async def employee_sales(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_employee_sales(
        db
    )
@router.get(
    "/sales/services",
    response_model=list[ServiceSalesReport],
)
async def service_sales(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_service_sales(
        db
    )
@router.get(
    "/sales/monthly",
    response_model=MonthlySalesReport,
)
async def monthly_sales(
    year: int,
    month: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_monthly_sales(
        db,
        year,
        month,
    )

@router.get(
    "/sales/daily",
    response_model=DailySalesReport,
)
async def daily_sales(
    report_date: date | None = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return await ReportService.get_daily_sales(
        db,
        report_date,
    )
