from typing import Annotated
from pydantic import BaseModel, Field, field_validator

# Lista de moedas válidas para conversão
# Pode ser expandida conforme necessidade do projeto
VALID_CURRENCIES = {
    "BRL", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "RUB",
    "MXN", "ZAR", "AED", "SGD", "HKD", "KRW", "SEK", "NOK", "DKK", "NZD", "TRY", "SAR"
}

class CurrencyConversionRequest(BaseModel):
    """
    Modelo de entrada para requisições de conversão de moeda.

    Campos:
        from_currency (str): Código da moeda de origem (ex: 'BRL').
        to_currency (str): Código da moeda de destino (ex: 'USD').
        amount (float): Valor a ser convertido. Deve ser maior que 0 e até 10 milhões.
    """

    from_currency: Annotated[str, Field(min_length=3, max_length=3)]
    to_currency: Annotated[str, Field(min_length=3, max_length=3)]
    amount: Annotated[float, Field(gt=0, le=10_000_000)]

    @field_validator("from_currency", "to_currency")
    def validar_moeda(cls, value: str) -> str:
        """
        Valida se o código da moeda está na lista permitida.
        Converte o valor para maiúsculo antes da verificação.
        """
        value = value.upper()
        if value not in VALID_CURRENCIES:
            raise ValueError(f"Moeda inválida: {value}")
        return value

    @field_validator("to_currency")
    def moedas_diferentes(cls, to_currency: str, info) -> str:
        """
        Garante que a moeda de destino seja diferente da moeda de origem.
        """
        if to_currency == info.data.get("from_currency"):
            raise ValueError("As moedas de origem e destino devem ser diferentes.")
        return to_currency
