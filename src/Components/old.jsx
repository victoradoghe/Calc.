import { useState } from "react";
import "./index.css";
import { MynauiDelete } from "./Components/Deleteicon";

const Numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

const App = () => {
  return (
    <div>
      <DisplayCal />
    </div>
  );
};

const DisplayCal = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Numbers
  function handleClick(value) {
    setInput((prev) => prev + value);
  }

  // Operators
  function handleOperation(op) {
    setInput((prev) => prev + " " + op + " ");
  }

  // Evaluate
  function handleEqual() {
    try {
      let expression = input
        .replace(/x/g, "*")
        .replace(/÷/g, "/");

      const evalResult = eval(expression);
      setResult(evalResult.toString());
    } catch {
      alert("Invalid expression");
    }
  }

  // Clear
  function handleClear() {
    setInput("");
    setResult("");
  }

  // Delete (backspace)
  function handleDelete() {
    setInput((a) => a.slice(0, -1));
  }

  // Percentage
  function handlePercent() {
    if (!input) return;
    try {
      const value = parseFloat(input) / 100;
      setResult(value.toString());
    } catch {
      alert("Invalid percent");
    }
  }

  // Toggle sign
  function handleSign() {
    if (!input) return;
    if (input.startsWith("-")) {
      setInput(input.slice(1));
    } else {
      setInput("-" + input);
    }
  }

  return (
    <div className="header">
      {/* Display row */}
      <div className="input-row">
        <input type="text" value={input} readOnly />
        <MynauiDelete
          className={`deleteicon ${input.length > 0 ? "active" : ""}`}
          onClick={handleDelete}
        />
      </div>

      {/* Result */}
      <div className="result">{result}</div>

      <hr />

      {/* Main buttons */}
      <div className="main-header">
        {Numbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}

        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={handlePercent}>%</button>
        <button className="operators" onClick={() => handleOperation("+")}>
          +
        </button>
        <button className="operators" onClick={() => handleOperation("-")}>
          -
        </button>
        <button className="operators" onClick={() => handleOperation("÷")}>
          ÷
        </button>
        <button className="operators" onClick={() => handleOperation("x")}>
          ×
        </button>
        <button onClick={handleSign}>+/-</button>
        <button style={{ color: "rgba(209, 57, 27, 1)" }} onClick={handleClear}>
          C
        </button>
        <button onClick={() => handleOperation("(")}>()</button>
        <button className="equalsign" onClick={handleEqual}>
          =
        </button>
      </div>
    </div>
  );
};

export default App;
