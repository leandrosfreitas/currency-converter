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

- **Backend (FastAPI)**: expõe uma API REST que valida os dados, consulta uma API externa de câmbio e retorna os resultados formatados.
- **Frontend (React + Vite)**: oferece uma interface moderna e responsiva com histórico, tema escuro e feedback visual.

---

## ⚙️ Como instalar e executar

### 🔧 Backend (FastAPI)

1. Acesse a pasta `backend`:
   ```bash
   cd backend
   ```

2. Crie e ative o ambiente virtual:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Linux/macOS
   .venv\Scripts\activate      # Windows
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

4. Crie sua própria conta em um serviço de câmbio (como [CurrencyAPI](https://currencyapi.com), [ExchangeRate-API](https://www.exchangerate-api.com) ou outro de sua preferência) e gere sua chave de acesso.

5. Configure o arquivo `.env` com a URL da API e sua chave:

   ```dotenv
   API_URL=https://api.exemplo.com/latest?apikey=SUA_CHAVE_AQUI
   DATABASE_URL=postgresql://user:password@localhost:5432/currency_db
   ```

6. Execute o servidor:

   ```bash
   uvicorn app.main:app --reload
   ```

---

### 🖥️ Frontend (React + Vite)

1. Acesse a pasta `frontend`:

   ```bash
   cd frontend
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
