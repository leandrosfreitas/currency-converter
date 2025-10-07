import { useState, useEffect, useMemo } from 'react'; 
import Header, { LoadingSpinner } from './Header'; 
import '../styles/ConverterForm.css'; 
import ResultBox from './ResultBox'; 


// CHAVES PRA ARMAZENAR OS DADOS DO LOCALSTORAGE
const HISTORY_STORAGE_KEY = 'DindinconverterHistory';
const THEME_STORAGE_KEY = 'DindinConverterTheme';

// DICIONARIO 

const CURRENCY_OPTIONS = [
  "BRL - Real Brasileiro", "USD - Dólar Americano", "EUR - Euro", "GBP - Libra Esterlina", 
  "JPY - Iene Japonês", "AUD - Dólar Australiano", "CAD - Dólar Canadense", "CHF - Franco Suíço", 
  "CNY - Yuan Chinês", "INR - Rúpia Indiana", "RUB - Rublo Russo", "MXN - Peso Mexicano", 
  "ZAR - Rand Sul-Africano", "SGD - Dólar de Cingapura", "HKD - Dólar de Hong Kong", 
  "KRW - Won Sul-Coreano", "SEK - Coroa Sueca", "NOK - Coroa Norueguesa", "DKK - Coroa Dinamarquesa", 
  "NZD - Dólar Neozelandês", "TRY - Lira Turca", "SAR - Rial Saudita", "AED - Dirham dos Emirados Árabes", 
];

// FORMATACAO DAS STRINGS E DATAS 
const formatCurrencyCode = (currencyString) => currencyString.split(' ')[0];

const getFormattedDate = (date) => date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const getFormattedTime = (date) => date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

const getFullFormattedDateTime = (date) => date.toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '');


function ConverterForm() {
    
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || 'false'));   

  const [showHistory, setShowHistory] = useState(false); 

  const [amount, setAmount] = useState('');

  const [fromCurrency, setFromCurrency] = useState('BRL - Real Brasileiro');

  const [toCurrency, setToCurrency] = useState('USD - Dólar Americano');

  const [lastResult, setLastResult] = useState(null); 
  
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]').slice(0, 5));

 /// EFEITO PARA ALTERAR PARA MODO ESCURO  
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // EFEITO PARA SALVAR O HISTORICO
  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const handleToggleHistory = () => setShowHistory(prev => !prev);

  const handleToggleTheme = () => setIsDarkMode(prev => !prev);



  const todayHistory = useMemo(() => {
    const todayString = getFormattedDate(new Date());
    return history.filter(item => item.date === todayString);
  }, [history]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const parsedAmount = parseFloat(amount);

    
    if (!amount || parsedAmount <= 0) {
      return setLastResult(<p className="custom-error-message">Por favor, digite um valor válido para conversão.</p>);
    }
    
    if (fromCurrency === toCurrency) {
      return setLastResult(<p className="custom-error-message">As moedas de origem e destino não podem ser as mesmas.</p>);
    }
    
    setLastResult(<p className="converting-message">Convertendo... <LoadingSpinner /></p>);
    
    const fromCode = formatCurrencyCode(fromCurrency);
    const toCode = formatCurrencyCode(toCurrency);

    try {
      const response = await fetch('http://localhost:8000/currency/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_currency: fromCode, to_currency: toCode, amount: parsedAmount })
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Se for erro de validação (422), mostra a mensagem
        if (response.status === 422 && Array.isArray(errorData.detail)) {
          const mensagens = errorData.detail.map((e) => e.msg).join(' | ');
          return setLastResult(<p className="custom-error-message">Erro: {mensagens}</p>);
        }

        // Outros erros genéricos
        return setLastResult(<p className="custom-error-message">Erro ao converter moeda. Tente novamente.</p>);
      }

      const data = await response.json();
      const cotacaoTimestamp = new Date(data.data);
      const valorFormatado = parseFloat(data.valor_convertido).toFixed(2);
      const cotacaoFormatada = parseFloat(data.cotação).toFixed(5);
      
    // ATUALIZA O HISTORICO 
      const newHistoryItem = {
          id: Date.now(),
          time: getFormattedTime(cotacaoTimestamp), 
          date: getFormattedDate(cotacaoTimestamp), 
          query: `${parsedAmount} ${fromCode} para ${toCode}`,
          result: `${valorFormatado} ${toCode}`,
     };

      setHistory(prevHistory => [newHistoryItem, ...prevHistory.slice(0, 4)]);
      
      
      const linha1 = `${valorFormatado} ${data.para_moeda}`; 
      const linha2 = `(Cotação: ${cotacaoFormatada}, Data: ${getFullFormattedDateTime(cotacaoTimestamp)})`;
      
      const resultHtml = (
         <div className="conversion-result-box"> 
           <span className="main-result">{linha1}</span>
            <span className="details-result">{linha2}</span>
         </div>
      );

      setLastResult(resultHtml);

    } catch (error) {
        setLastResult(<p className="custom-error-message">Erro de conexão com o servidor.</p>);
        console.error(error);
      }
  };


  const renderCurrencyOptions = () => (
    CURRENCY_OPTIONS.map(currency => (
      <option key={currency} value={currency}>{currency}</option>
    ))
  );


  return (
    <>
       
      <div className="theme-toggle-container">
          <button 
              type="button" 
              id="toggle-theme-btn" 
              onClick={handleToggleTheme}
              title={isDarkMode ? 'Desativar Tema Escuro' : 'Ativar Tema Escuro'}
          >
              <span className={`toggle-switch ${isDarkMode ? 'active' : ''}`}></span>
          </button>
      </div>
      
     
      <p className="app-description">Converta suas moedas de forma rápida e fácil. </p>


      <form onSubmit={handleSubmit}>
        <div className= "input-full-width">
        <input 
          type="number"
          placeholder="Digite o valor (ex: 100)"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        </div>

        <div className="currency-selector-line">
          <select required value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {renderCurrencyOptions()}
          </select>
          <button type="button" id="swap-btn" onClick={handleSwap}>⇄</button>

          <select required value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {renderCurrencyOptions()}
          </select>

          <button type="submit">Converter</button>
        </div>
      </form>

      
      <div className="result-container-above-history">
          <ResultBox result={lastResult} />
      </div>

      
       <div className="history-button-container">
           <button 
             type="button" 
             id="toggle-history-btn" 
             onClick={handleToggleHistory}
           >
             {showHistory ? 'Ocultar Histórico ' : 'Mostrar Histórico '}
           </button>
       </div>

    

      {showHistory && todayHistory.length > 0 && <ConversionHistory history={todayHistory} />}
            
     
      {showHistory && todayHistory.length === 0 && (
          <div className="history-container"><p>Sem histórico de conversões para hoje.</p></div>
      )}
    </>
  );
}

export default ConverterForm;

// 
function ConversionHistory({ history }) {
    if (history.length === 0) {
        return <div className="history-container"><p>Sem histórico de conversões.</p></div>;
    }

    return (
        <div className="history-container">
             <h2>Ultimas conversões </h2>
             <ul className="history-list">
                 {history.map(item => (
                     <li key={item.id} className="history-item">
                        <span className="history-time">
                             [{item.date} {item.time}] 
                        </span> 
                         <span className="history-query"> {item.query}</span>
                          <span className="history-arrow"> → </span>
                         <strong className="history-result">{item.result}</strong>
                     </li>
                ))}
             </ul>
         </div>
     );
}
