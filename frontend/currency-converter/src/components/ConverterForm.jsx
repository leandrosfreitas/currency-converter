import { useState } from 'react';
import '../styles/ConverterForm.css';


// DICIONARIO DE MOEDAS COM 20 MOEDAS
const CURRENCY_OPTIONS = [
  "BRL - Real Brasileiro",
  "USD - Dólar Americano",
  "EUR - Euro",
  "GBP - Libra Esterlina",
  "JPY - Iene Japonês",
  "AUD - Dólar Australiano",
  "CAD - Dólar Canadense",
  "CHF - Franco Suíço",
  "CNY - Yuan Chinês",
  "INR - Rúpia Indiana",
  "RUB - Rublo Russo",
  "MXN - Peso Mexicano",
  "ZAR - Rand Sul-Africano",
  "SGD - Dólar de Cingapura",
  "HKD - Dólar de Hong Kong",
  "KRW - Won Sul-Coreano",
  "SEK - Coroa Sueca",
  "NOK - Coroa Norueguesa",
  "DKK - Coroa Dinamarquesa",
  "NZD - Dólar Neozelandês",
  "TRY - Lira Turca",
  "SAR - Rial Saudita",
  "AED - Dirham dos Emirados Árabes", 
];

function ConverterForm({ setResult }) {

  const [amount, setAmount] = useState('');

  const [fromCurrency, setFromCurrency] = useState('BRL - Real Brasileiro');
  const [toCurrency, setToCurrency] = useState('USD - Dólar Americano');

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    console.log('Moedas trocadas!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Convertendo... ⏳');
    // Extrai apenas o código da moeda (ex: "BRL" de "BRL - Real Brasileiro")
    const fromCode = fromCurrency.split(' ')[0];
    const toCode = toCurrency.split(' ')[0];

    // VALICAÇÃO PARA EVITAR QUE AS MOEDAS SEJAM IGUAIS    
      if (fromCurrency === toCurrency) {
        setResult('Erro: As moedas de origem e destino são as mesmas.');
        return;
    }

    try {
      const response = await fetch('http://localhost:8000/currency/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_currency: fromCode,
          to_currency: toCode,
          amount: parseFloat(amount)
        })
      });

      const data = await response.json();
      
      // FORMATACAO DA DATA E HORA 
      const dataHoraFormatada = new Date(data.data).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      });

      
   // FORMATACAO DO RESULTADO COM QUEBRA DE LINHA 
      const linha1 = `${data.valor_convertido} ${data.para_moeda}`; 
      const linha2 = `(Cotação: ${data.cotação}, Data: ${dataHoraFormatada})`;
     setResult(
      <>
        {linha1}
        <br />
        {linha2}
      </>
    );

    } catch (error) {
      setResult('Erro ao converter moeda. Tente novamente.');
      console.error(error);
    }
  };

   // FUNCAO PARA RENDERIZAR AS OPCOES DE MOEDAS
  const renderCurrencyOptions = (excludedCurrency) => {
    return CURRENCY_OPTIONS
      .filter(currency => currency !== excludedCurrency) 
      .map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ));
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div className= "input-full-width">
      <input 
        type="number"
        placeholder="Digite o valor (ex: 100)"
        step="0.01"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      </div>

      <select required value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
       {renderCurrencyOptions()}
      </select>
      <button type="button" id="swap-btn" onClick={handleSwap}>⇄</button>

      <select required value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
    
        {renderCurrencyOptions()}
      </select>


      <button type="submit">Converter</button>
    </form>
  );
}

export default ConverterForm;
