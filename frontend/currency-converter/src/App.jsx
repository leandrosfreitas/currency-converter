import Header from './components/Header';
import ConverterForm from './components/ConverterForm';
import ResultBox from './components/ResultBox';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState('');

  return (
    <div className="converter-wrapper">
      <Header />
      <ConverterForm setResult={setResult} />
      <ResultBox result={result} />
    </div>
  );
}

export default App;
