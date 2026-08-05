from functools import lru_cache
from pathlib import Path
import platform
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    APP_NAME: str = "SalonFlow"
    APP_VERSION: str = "1.0.0"
    
    ENVIRONMENT: str = "development"

    DEBUG: bool = False

    DATABASE_URL: str

    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    FRONTEND_URL: str = "http://localhost:5173"
    
    # =====================================================
    # Application Data Directory
    # =====================================================

    if platform.system() == "Windows":
        APP_DATA_DIR: Path = (
            Path.home()
            / "Documents"
            / "SalonFlow"
        )
    else:
        APP_DATA_DIR: Path = (
            Path.home()
            / "Documents"
            / "SalonFlow"
        )

    BACKUP_DIR: Path = APP_DATA_DIR / "backups"

    EXPORT_DIR: Path = APP_DATA_DIR / "exports"

    LOG_DIR: Path = APP_DATA_DIR / "logs"

    LICENSE_DIR: Path = APP_DATA_DIR / "license"

    CONFIG_DIR: Path = APP_DATA_DIR / "config"    

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
