import '../styles/ResultBox.css';

function ResultBox({ result }) {
  if (!result) return null;

  return (
    <div id="result-box">
      {result}
    </div>
  );
}

export default ResultBox;
