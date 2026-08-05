from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.app_setting import AppSetting
from app.schemas.app_setting import (
    AppSettingsResponse,
    AppSettingsUpdate,
)


class AppSettingService:

    @staticmethod
    async def get_settings(
        db: AsyncSession,
    ) -> AppSettingsResponse:

        result = await db.execute(
            select(AppSetting)
        )

        settings = {
            item.key: item.value
            for item in result.scalars().all()
        }

        return AppSettingsResponse(
            salon_name=settings.get("salon_name", ""),
            phone=settings.get("phone"),
            email=settings.get("email"),
            address=settings.get("address"),
            currency=settings.get("currency", "MMK"),
            tax_percent=float(
                settings.get("tax_percent", 0)
            ),
            receipt_footer=settings.get(
                "receipt_footer"
            ),
        )

    @staticmethod
    async def save_settings(
        db: AsyncSession,
        data: AppSettingsUpdate,
    ) -> AppSettingsResponse:

        values = data.model_dump()

        for key, value in values.items():

            result = await db.execute(
                select(AppSetting).where(
                    AppSetting.key == key
                )
            )

            setting = result.scalar_one_or_none()

            if setting:
                setting.value = (
                    None if value is None
                    else str(value)
                )
            else:
                db.add(
                    AppSetting(
                        key=key,
                        value=None if value is None else str(value),
                    )
                )

        await db.commit()

        return await AppSettingService.get_settings(db)
