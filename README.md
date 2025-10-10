# KambioFlash

Uma aplicação completa para conversão de moedas em tempo real, com frontend em **React + Vite** e backend em **FastAPI**. Ideal para quem precisa consultar cotações atualizadas e realizar conversões com praticidade e interface intuitiva.

---

## 📌 Descrição do projeto

O KambioFlash permite ao usuário:

- Converter valores entre moedas internacionais
- Visualizar a cotação atual e a data da conversão
- Alternar entre tema claro e escuro
- Consultar o histórico de conversões realizadas no dia

A aplicação é dividida em dois módulos:

- **Backend (FastAPI)**: expfornece uma API REST que valida os dados, consulta uma API externa de câmbio e retorna os resultados formatados.
- **Frontend (React + Vite)**: oferece uma interface moderna e responsiva com histórico, tema escuro e feedback visual.

---

## ⚙️ Como instalar e executar

### 🔧 Backend (FastAPI)


1. Instale o Poetry (caso ainda não tenha):

   #### Linux/macOS:
   ```bash
   curl -sSL https://install.python-poetry.org | python3
   ```

   #### Windows (PowerShell):
   ```powershell
   (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python
   ```

2. Reinicie o terminal (se necessário) e verifique se o Poetry foi instalado corretamente:

   ```bash
   poetry --version
   ```

3. Instale as dependências do projeto:
   ```bash
   poetry install
   ```

4. Ative o ambiente virtual do Poetry:
   ```bash
   poetry shell
   ```

5. Configure o arquivo `.env` com a URL da API e sua chave:
   ```dotenv
   API_URL=4acb7ff47f493faa4afdae8762a3cf2a
   ```

6. Execute o servidor:

   ```bash
   fastapi dev backend/app/main.py
   ```

---

### 🖥️ Frontend (React + Vite)

1. Acesse a pasta `frontend/currency-converter`:

   ```bash
   cd frontend/currency-converter
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse no navegador:

   ```
   http://localhost:5173
   ```

---

## 🧪 Exemplo de uso

### Interface

* Digite o valor a ser convertido
* Selecione a moeda de origem e destino
* Clique em **Converter**
* Veja o resultado com cotação e data
* Acesse o histórico das últimas conversões

### Requisição da API

```http
POST /currency/convert
Content-Type: application/json
```

```json
{
  "from_currency": "BRL",
  "to_currency": "USD",
  "amount": 100.00
}
```

### Resposta esperada

```json
{
  "valor_convertido": 19.23,
  "cotação": 0.1923,
  "da_moeda": "BRL",
  "para_moeda": "USD",
  "valor": 100.0,
  "data": "2025-10-09T18:00:00"
}
```

---

## 🌐 API externa utilizada

Este projeto utiliza a API gratuita [exchangerate.host](https://exchangerate.host) para obter as taxas de câmbio em tempo real e históricas.

### Exemplos de requisição à exchangerate.host

#### Conversão simples
```http
GET https://api.exchangerate.host/convert?from=BRL&to=USD&amount=100
```

#### Consulta de taxa histórica
```http
GET https://api.exchangerate.host/2025-10-01?base=USD&symbols=BRL
```

#### Últimas taxas
```http
GET https://api.exchangerate.host/latest?base=USD&symbols=BRL,EUR,GBP
```

---

## 🚀 Contribuições futuras

* Autenticação de usuários
* Histórico persistente com banco de dados
* Suporte a múltiplas APIs de câmbio
* Exportação de histórico em CSV ou PDF
* Deploy com Docker e CI/CD
* Tradução da interface para múltiplos idiomas

---

## 🤝 Como contribuir

1. Fork este repositório
2. Crie uma branch com sua feature:

   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:

   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie um pull request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
