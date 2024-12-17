import React, { useState } from "react";
import { evaluate } from "mathjs";  //npm install mathjs

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      setInput(evaluate(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return (
    <div style={styles.container}>
      <h1>Calculator</h1>
      <div style={styles.screen}>{input}</div>
      <div style={styles.buttons}>
        <button onClick={clearInput} style={styles.button}>
          C
        </button>
        {["7", "8", "9", "/"].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            style={styles.button}
          >
            {item}
          </button>
        ))}
        {["4", "5", "6", "*"].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            style={styles.button}
          >
            {item}
          </button>
        ))}
        {["1", "2", "3", "-"].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            style={styles.button}
          >
            {item}
          </button>
        ))}
        {["0", ".", "=", "+"].map((item) => (
          <button
            key={item}
            onClick={item === "=" ? calculateResult : () => handleClick(item)}
            style={styles.button}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center",
  },
  screen: {
    width: "100%",
    height: "50px",
    background: "#eee",
    color: "black",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 10px",
    fontSize: "1.5rem",
    borderRadius: "5px",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  button: {
    height: "50px",
    fontSize: "1.2rem",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Calculator;