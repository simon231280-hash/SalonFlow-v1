from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import require_admin
from app.core.database import get_db
from app.models.user import User
from app.schemas.product import (
    ProductCreate,
    ProductRead,
    ProductUpdate,
)
from app.services.product_service import ProductService

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.post(
    "/",
    response_model=ProductRead,
    status_code=status.HTTP_201_CREATED,
)
async def create_product(
    product: ProductCreate,
    db: AsyncSession = Depends(get_db),
):

    try:
        return await ProductService.create(
            db,
            product,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/",
    response_model=list[ProductRead],
)
async def get_products(
    db: AsyncSession = Depends(get_db),
):

    return await ProductService.get_all(
        db
    )


@router.get(
    "/low-stock",
    response_model=list[ProductRead],
)
async def get_low_stock_products(
    db: AsyncSession = Depends(get_db),
):

    return await ProductService.get_low_stock(
        db
    )


@router.get(
    "/{product_id}",
    response_model=ProductRead,
)
async def get_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
):

    product = await ProductService.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return product


@router.put(
    "/{product_id}",
    response_model=ProductRead,
)
async def update_product(
    product_id: int,
    product: ProductUpdate,
    db: AsyncSession = Depends(get_db),
):

    db_product = await ProductService.get_by_id(
        db,
        product_id,
    )

    if db_product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return await ProductService.update(
        db,
        db_product,
        product,
    )


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):

    product = await ProductService.get_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    await ProductService.delete(
        db,
        product,
    )
