from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # MongoDB Atlas
    MONGODB_URI: str = "mongodb://localhost:27017/diya_portfolio"
    
    # Resend Email Integration
    RESEND_API_KEY: str = ""
    CONTACT_TO_EMAIL: str = "diyapanjwani00@gmail.com"
    
    # Admin Protection
    ADMIN_TOKEN: str = "diya-admin-secret-2026"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
