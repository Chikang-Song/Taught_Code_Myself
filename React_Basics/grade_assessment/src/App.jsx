import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState(0);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  function plus(e) {
    e.preventDefault(); //기본 동작 방지
    setResult((result) => result + Number(inputRef.current.value));
  };

  function minus(e) {
    e.preventDefault();
    setResult((result) => result - Number(inputRef.current.value));
  };

  function times(e) {
    e.preventDefault();
    setResult((result) => result * Number(inputRef.current.value));
  }

  function divide(e) {
    e.preventDefault();
    setResult((result) => result / Number(inputRef.current.value));
  }

  function resetInput(e) {
    e.preventDefault();
    inputRef.current.value = "";
  };

  function resetResult(e) {
    e.preventDefault();
    setResult(0);
  }

  return (
    <div className = 'App'>
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <p ref={resultRef}>
          {result}
        </p>
        <input 
          pattern="[0-9]"
          ref={inputRef}
          type="number"
          placeholder="Type a number"
        />
        <button onClick={plus}>➕</button>
        <button onClick={minus}>➖</button>
        <button onClick={times}>✖️</button>
        <button onClick={divide}>➗</button>
        <button onClick={resetInput}>reset input</button>
        <button onClick={resetResult}>reset result</button>
      </form>
    </div>
  )
}

export default App
