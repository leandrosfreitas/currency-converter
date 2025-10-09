from fastapi.testclient import TestClient
from app.main import app

# Cria um cliente de teste para simular requisições HTTP à API
client = TestClient(app)

def test_conversao_valida():
    """
    Testa uma conversão válida entre BRL e USD com valor decimal permitido.
    Espera resposta 200 e presença dos campos esperados no resultado.
    """
    response = client.post("/currency/convert", json={
        "from_currency": "BRL",
        "to_currency": "USD",
        "amount": 123.456789
    })
    assert response.status_code == 200
    data = response.json()
    assert "valor_convertido" in data
    assert "cotação" in data
    assert "data" in data

def test_moedas_iguais():
    """
    Testa o caso em que a moeda de origem e destino são iguais.
    Espera resposta 422 com mensagem de erro apropriada.
    """
    response = client.post("/currency/convert", json={
        "from_currency": "USD",
        "to_currency": "USD",
        "amount": 100
    })
    assert response.status_code == 422
    assert "As moedas de origem e destino" in response.text

def test_moeda_invalida():
    """
    Testa o envio de uma moeda inválida (não presente na lista permitida).
    Espera resposta 422 com mensagem de erro sobre moeda inválida.
    """
    response = client.post("/currency/convert", json={
        "from_currency": "XXX",
        "to_currency": "USD",
        "amount": 100
    })
    assert response.status_code == 422
    assert "Moeda inválida" in response.text

def test_valor_negativo():
    """
    Testa o envio de um valor negativo para conversão.
    Espera resposta 422 com mensagem de erro sobre valor inválido.
    """
    response = client.post("/currency/convert", json={
        "from_currency": "BRL",
        "to_currency": "USD",
        "amount": -50
    })
    assert response.status_code == 422
    assert "Input should be" in response.text

def test_valor_ausente():
    """
    Testa o envio de requisição sem o campo 'amount'.
    Espera resposta 422 com mensagem de campo obrigatório ausente.
    """
    response = client.post("/currency/convert", json={
        "from_currency": "BRL",
        "to_currency": "USD"
    })
    assert response.status_code == 422
    assert "Field required" in response.text
