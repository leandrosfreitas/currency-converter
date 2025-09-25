from fastapi import FastAPI
from app.api import currency, user

def create_app():
    app = FastAPI(
        title="Currency Converter API",
        version="0.1.0"
    )

    app.include_router(currency.router, prefix="/currency", tags=["Currency"])
    app.include_router(user.router, prefix="/user", tags=["User"])

    return app

app = create_app()
