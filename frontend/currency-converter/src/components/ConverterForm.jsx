import { useState } from 'react';
import '../styles/ConverterForm.css';

function ConverterForm({ setResult }) {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

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

      setResult(`${data.valor} ${data.da_moeda} = ${data.valor_convertido} ${data.para_moeda} (Cotação: ${data.cotação}, Data: ${data.data})`);
    } catch (error) {
      setResult('Erro ao converter moeda. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Digite o valor (ex: 100)"
        step="0.01"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select required value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="">De:</option>
        <option value="BRL - Real Brasileiro">BRL - Real Brasileiro</option>
        <option value="USD - Dólar Americano">USD - Dólar Americano</option>
        <option value="EUR - Euro">EUR - Euro</option>
        <option value="GBP - Libra Esterlina">GBP - Libra Esterlina</option>
        <option value="JPY - Iene Japonês">JPY - Iene Japonês</option>
        <option value="AUD - Dólar Australiano">AUD - Dólar Australiano</option>
        <option value="CAD - Dólar Canadense">CAD - Dólar Canadense</option>
        <option value="CHF - Franco Suíço">CHF - Franco Suíço</option>
      </select>

      <select required value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="">Para:</option>
        <option value="BRL - Real Brasileiro">BRL - Real Brasileiro</option>
        <option value="USD - Dólar Americano">USD - Dólar Americano</option>
        <option value="EUR - Euro">EUR - Euro</option>
        <option value="GBP - Libra Esterlina">GBP - Libra Esterlina</option>
        <option value="JPY - Iene Japonês">JPY - Iene Japonês</option>
        <option value="AUD - Dólar Australiano">AUD - Dólar Australiano</option>
        <option value="CAD - Dólar Canadense">CAD - Dólar Canadense</option>
        <option value="CHF - Franco Suíço">CHF - Franco Suíço</option>
      </select>

      <button type="button" id="swap-btn" onClick={handleSwap}>🔄 Trocar</button>
      <button type="submit">Converter</button>
    </form>
  );
}

export default ConverterForm;
