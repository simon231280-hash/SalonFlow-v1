from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.invoice_product_item import (
    InvoiceProductItemCreate,
    InvoiceProductItemRead,
)
from app.services.invoice_product_service import (
    InvoiceProductService,
)

router = APIRouter(
    prefix="/invoice-products",
    tags=["Invoice Products"],
)


@router.post(
    "/invoice/{invoice_id}",
    response_model=InvoiceProductItemRead,
    status_code=status.HTTP_201_CREATED,
)
async def add_product_to_invoice(
    invoice_id: int,
    data: InvoiceProductItemCreate,
    db: AsyncSession = Depends(get_db),
):

    try:
        return await InvoiceProductService.add_product(
            db=db,
            invoice_id=invoice_id,
            product_id=data.product_id,
            quantity=data.quantity,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
