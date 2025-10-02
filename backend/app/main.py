from fastapi import FastAPI
from app.api import currency, user
from fastapi.middleware.cors import CORSMiddleware

def create_app():
    app = FastAPI(
        title="Currency Converter API",
        version="0.1.0"
    )

    # ✅ Adiciona CORS antes das rotas
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],  # ou ["*"] para liberar geral
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(currency.router, prefix="/currency", tags=["Currency"])
    app.include_router(user.router, prefix="/user", tags=["User"])

    return app

app = create_app()
