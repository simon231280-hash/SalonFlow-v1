from pydantic_settings import BaseSettings, SettingsConfigDict


class TestSettings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool

    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    model_config = SettingsConfigDict(
        env_file=".env.test",
        extra="ignore",
    )


test_settings = TestSettings()
