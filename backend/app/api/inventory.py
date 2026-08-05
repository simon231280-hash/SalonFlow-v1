from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    get_current_user,
    require_admin,
)
from app.core.database import get_db
from app.models.user import User

from app.schemas.inventory_transaction import (
    InventoryTransactionCreate,
    InventoryTransactionRead,
)

from app.services.inventory_service import InventoryService


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"],
)


@router.post(
    "/transaction",
    response_model=InventoryTransactionRead,
)
async def create_inventory_transaction(
    transaction: InventoryTransactionCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):

    try:
        return await InventoryService.create_transaction(
            db,
            transaction,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/transactions",
    response_model=list[InventoryTransactionRead],
)
async def get_inventory_transactions(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return await InventoryService.get_transactions(
        db
    )


@router.get(
    "/product/{product_id}",
    response_model=list[InventoryTransactionRead],
)
async def get_product_inventory_history(
    product_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return await InventoryService.get_product_transactions(
        db,
        product_id,
    )
