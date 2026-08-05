from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db


router = APIRouter(
    tags=["Health"],
)


@router.get("/health")
async def health(
    db: AsyncSession = Depends(get_db),
):

    try:
        await db.execute(
            text("SELECT 1")
        )

        return {
            "status": "ok",
            "service": "SalonFlow API",
            "database": "connected",
        }

    except Exception:

        return {
            "status": "error",
            "service": "SalonFlow API",
            "database": "disconnected",
        }
