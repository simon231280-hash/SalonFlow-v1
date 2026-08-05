from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db

from app.models.inventory_transaction import InventoryTransaction
from app.models.product import Product

from app.schemas.inventory import (
    StockInCreate,
    StockOutCreate,
    InventoryTransactionResponse,
)

from app.services.inventory_service import InventoryService


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"],
)



@router.post(
    "/stock-in",
    response_model=InventoryTransactionResponse,
)
async def stock_in(
    data: StockInCreate,
    db: AsyncSession = Depends(get_db),
):

    try:
        return await InventoryService.stock_in(
            db,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )



@router.post(
    "/stock-out",
    response_model=InventoryTransactionResponse,
)
async def stock_out(
    data: StockOutCreate,
    db: AsyncSession = Depends(get_db),
):

    try:
        return await InventoryService.stock_out(
            db,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )



@router.get(
    "",
    response_model=list[InventoryTransactionResponse],
)
async def get_inventory_history(
    db: AsyncSession = Depends(get_db),
):

    result = await db.execute(
        select(InventoryTransaction)
        .order_by(
            InventoryTransaction.created_at.desc()
        )
    )

    return result.scalars().all()



@router.get(
    "/low-stock",
)
async def get_low_stock(
    db: AsyncSession = Depends(get_db),
):

    result = await db.execute(
        select(Product)
        .where(
            Product.stock_quantity <= Product.minimum_stock
        )
    )

    products = result.scalars().all()

    return products
