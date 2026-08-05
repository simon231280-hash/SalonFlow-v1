from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
)

from app.core.test_config import test_settings


engine = create_async_engine(
    test_settings.DATABASE_URL,
    echo=False,
)

TestingSessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False,
)
