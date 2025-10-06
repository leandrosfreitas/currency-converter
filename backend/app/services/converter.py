import httpx
from datetime import datetime
from fastapi import HTTPException
from app.core.config import API_URL

async def convert_currency(from_currency: str, to_currency: str, amount: float) -> dict:
    url = "https://api.exchangerate.host/convert"
    params = {
        "access_key": API_URL,
        "from": from_currency,
        "to": to_currency,
        "amount": amount
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, params=params)
            data = response.json()
    except httpx.ConnectTimeout:
        raise HTTPException(status_code=504, detail="Tempo de conexão esgotado com a API de câmbio.")
    
    return {
        "valor_convertido": data['result'],
        "cotação": data['info']['quote'],
        "da_moeda": data['query']['from'],
        "para_moeda": data['query']['to'],
        "valor": data['query']['amount'],
        "data": datetime.fromtimestamp(data['info']['timestamp']).isoformat()
    }
