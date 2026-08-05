from app.models.invoice import Invoice
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.invoice import (
    InvoiceRead,
    InvoiceUpdate,
)
from app.schemas.invoice_product_item import (
    InvoiceProductItemCreate,
)
from app.services.invoice_service import InvoiceService

router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"],
)


@router.post(
    "/appointment/{appointment_id}",
    response_model=InvoiceRead,
)
async def create_invoice(
    appointment_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return await InvoiceService.create(
            db,
            appointment_id,
            current_user.id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "/",
    response_model=list[InvoiceRead],
)
async def get_invoices(
    db: AsyncSession = Depends(get_db),
):
    return await InvoiceService.get_all(db)


@router.get(
    "/{invoice_id}",
    response_model=InvoiceRead,
)
async def get_invoice(
    invoice_id: int,
    db: AsyncSession = Depends(get_db),
):
    invoice = await InvoiceService.get_by_id(
        db,
        invoice_id,
    )

    if invoice is None:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return invoice


@router.put(
    "/{invoice_id}",
    response_model=InvoiceRead,
)
async def update_invoice(
    invoice_id: int,
    invoice: InvoiceUpdate,
    db: AsyncSession = Depends(get_db),
):
    db_invoice = await InvoiceService.get_by_id(
        db,
        invoice_id,
    )

    if db_invoice is None:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return await InvoiceService.update(
        db,
        db_invoice,
        invoice,
    )
@router.post(
    "/{invoice_id}/products",
    response_model=InvoiceRead,
)
async def add_product_to_invoice(
    invoice_id: int,
    product: InvoiceProductItemCreate,
    db: AsyncSession = Depends(get_db),
):
    try:
        return await InvoiceService.add_product(
            db,
            invoice_id,
            product,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.delete(
    "/{invoice_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_invoice(
    invoice_id: int,
    db: AsyncSession = Depends(get_db),
):
    invoice = await db.get(
        Invoice,
        invoice_id,
    )

    if invoice is None:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    await InvoiceService.delete(
        db,
        invoice,
    )

