from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate


async def create_service(
    db: AsyncSession,
    service_data: ServiceCreate,
) -> Service:
    service = Service(
        **service_data.model_dump()
    )

    db.add(service)
    await db.commit()
    await db.refresh(service)

    return service


async def get_services(
    db: AsyncSession,
) -> list[Service]:
    result = await db.execute(
        select(Service)
    )

    return result.scalars().all()


async def get_service(
    db: AsyncSession,
    service_id: int,
) -> Service | None:
    result = await db.execute(
        select(Service)
        .where(Service.id == service_id)
    )

    return result.scalar_one_or_none()


async def update_service(
    db: AsyncSession,
    service: Service,
    service_data: ServiceUpdate,
) -> Service:

    update_data = service_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(service, key, value)

    await db.commit()
    await db.refresh(service)

    return service


async def delete_service(
    db: AsyncSession,
    service: Service,
) -> None:

    await db.delete(service)
    await db.commit()
