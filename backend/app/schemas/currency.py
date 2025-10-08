from typing import Annotated
from pydantic import BaseModel, Field, field_validator

# Lista simplificada de moedas válidas (pode ser expandida)
VALID_CURRENCIES = {
    "BRL", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "RUB", "MXN", "ZAR", "AED", "SGD", "HKD", "KRW", "SEK", "NOK", "DKK", "NZD", "TRY", "SAR", 
}

class CurrencyConversionRequest(BaseModel):
    from_currency: Annotated[str, Field(min_length=3, max_length=3)]
    to_currency: Annotated[str, Field(min_length=3, max_length=3)]
    amount: Annotated[float, Field(gt=0, le=10_000_000)]

    @field_validator("from_currency", "to_currency")
    def validar_moeda(cls, value):
        value = value.upper()
        if value not in VALID_CURRENCIES:
            raise ValueError(f"Moeda inválida: {value}")
        return value

    @field_validator("to_currency")
    def moedas_diferentes(cls, to_currency, info):
        if to_currency == info.data.get("from_currency"):
            raise ValueError("As moedas de origem e destino devem ser diferentes.")
        return to_currency
