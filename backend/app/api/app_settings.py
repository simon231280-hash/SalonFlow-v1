from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.app_setting import (
    AppSettingsResponse,
    AppSettingsUpdate,
)
from app.services.app_setting_service import AppSettingService

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


@router.get(
    "",
    response_model=AppSettingsResponse,
)
async def get_settings(
    db: AsyncSession = Depends(get_db),
):
    return await AppSettingService.get_settings(db)


@router.put(
    "",
    response_model=AppSettingsResponse,
)
async def save_settings(
    data: AppSettingsUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await AppSettingService.save_settings(
        db,
        data,
    )
