from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.payment import (
    PaymentCreate,
    PaymentRead,
    PaymentUpdate,
)
from app.services.payment_service import PaymentService

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


@router.post(
    "/",
    response_model=PaymentRead,
    status_code=status.HTTP_201_CREATED,
)
async def create_payment(
    payment: PaymentCreate,
    db: AsyncSession = Depends(get_db),
):

    try:
        return await PaymentService.create(
            db,
            payment,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/",
    response_model=list[PaymentRead],
)
async def get_payments(
    db: AsyncSession = Depends(get_db),
):

    return await PaymentService.get_all(db)


@router.get(
    "/{payment_id}",
    response_model=PaymentRead,
)
async def get_payment(
    payment_id: int,
    db: AsyncSession = Depends(get_db),
):

    payment = await PaymentService.get_by_id(
        db,
        payment_id,
    )

    if payment is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return payment


@router.put(
    "/{payment_id}",
    response_model=PaymentRead,
)
async def update_payment(
    payment_id: int,
    payment_update: PaymentUpdate,
    db: AsyncSession = Depends(get_db),
):

    payment = await PaymentService.get_by_id(
        db,
        payment_id,
    )

    if payment is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return await PaymentService.update(
        db,
        payment,
        payment_update,
    )


@router.delete(
    "/{payment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_payment(
    payment_id: int,
    db: AsyncSession = Depends(get_db),
):

    payment = await PaymentService.get_by_id(
        db,
        payment_id,
    )

    if payment is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    await PaymentService.delete(
        db,
        payment,
    )
