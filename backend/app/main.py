from fastapi import FastAPI
from app.api import currency
from fastapi.middleware.cors import CORSMiddleware

def create_app() -> FastAPI:
    """
    Cria e configura a instância principal da aplicação FastAPI.

    Configurações aplicadas:
    - Define título e versão da API.
    - Adiciona middleware CORS para permitir requisições do frontend.
    - Inclui o roteador de conversão de moedas com prefixo '/currency'.

    Returns:
        FastAPI: Instância configurada da aplicação.
    """
    app = FastAPI(
        title="Currency Converter API",
        version="0.1.0"
    )

    # Middleware CORS: permite que o frontend (ex: localhost:5173) acesse a API
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],  # ou ["*"] para liberar geral
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Registra o roteador de conversão de moedas
    app.include_router(currency.router, prefix="/currency", tags=["Currency"])

    return app

# Inicializa a aplicação
app = create_app()
