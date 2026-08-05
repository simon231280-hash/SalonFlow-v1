from app.api.app_settings import router as app_settings_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.admin import router as admin_router
from app.core.middleware import log_requests
from fastapi import FastAPI
from app.api.payments import router as payment_router
from app.api.employees import router as employee_router
from app.api.appointments import router as appointment_router
from app.api.auth import router as auth_router
from app.api.customers import router as customer_router
from app.core.exceptions import register_exception_handlers
from app.core.logger import setup_logging
from app.api import services
from app.api import backup
from app.api import inventory
from app.core.config import settings
from app.api.invoices import router as invoice_router
from app.api.dashboard import router as dashboard_router
from app.api.products import router as product_router
from app.api.inventory import router as inventory_router
from app.api.reports import router as report_router
from app.api.invoice_products import (
    router as invoice_product_router,
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = setup_logging()
# Create application folders

for folder in (
    settings.APP_DATA_DIR,
    settings.BACKUP_DIR,
    settings.EXPORT_DIR,
    settings.LOG_DIR,
    settings.LICENSE_DIR,
    settings.CONFIG_DIR,
):
    folder.mkdir(
        parents=True,
        exist_ok=True,
    )
register_exception_handlers(app)
logger.info("SalonFlow API started.")

app.include_router(auth_router)
app.include_router(customer_router)
app.include_router(appointment_router)
app.include_router(employee_router)
app.include_router(services.router)
app.include_router(dashboard_router)
app.include_router(invoice_router,)
app.include_router(payment_router)
app.include_router(product_router)
app.include_router(inventory_router)
app.include_router(invoice_product_router)
app.include_router(report_router)
app.middleware("http")(log_requests)
app.include_router(app_settings_router)
app.include_router(admin_router)
app.include_router(health_router)
app.include_router(backup.router)


@app.get("/")
async def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}"
    }
