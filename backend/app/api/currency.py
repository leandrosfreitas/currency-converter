from fastapi import APIRouter
from app.schemas.currency import CurrencyConversionRequest
from app.services.converter import convert_currency

router = APIRouter()

@router.post("/convert")
async def convert(request: CurrencyConversionRequest):
    result = await convert_currency(
        from_currency=request.from_currency,
        to_currency=request.to_currency,
        amount=request.amount
    )
    return result
