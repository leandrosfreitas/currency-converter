from fastapi import APIRouter
from app.schemas.currency import CurrencyConversionRequest
from app.services.converter import convert_currency

# Cria um roteador para agrupar endpoints relacionados à conversão de moedas
router = APIRouter()

@router.post("/convert")
async def convert(request: CurrencyConversionRequest) -> dict:
    """
    Realiza a conversão de moeda com base nos dados fornecidos.

    Args:
        request (CurrencyConversionRequest): Objeto contendo a moeda de origem,
        moeda de destino e o valor a ser convertido.

    Returns:
        dict: Resultado da conversão contendo valor convertido, cotação,
        moedas envolvidas e data da cotação.
    """
    # Chama o serviço de conversão com os dados validados
    result = await convert_currency(
        from_currency=request.from_currency,
        to_currency=request.to_currency,
        amount=request.amount
    )
    return result
