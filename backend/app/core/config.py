import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env para o ambiente do sistema
load_dotenv()

# URL da API externa de câmbio, definida no .env como API_URL
API_URL: str | None = os.getenv("API_URL")

# Validação obrigatória
if not API_URL:
    raise RuntimeError("API_URL não definida no ambiente.")
