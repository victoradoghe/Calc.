import { useState } from "react";
import "./index.css";
import { RadixIconsRulerHorizontal } from "./Components/Rulericon";
import { MynauiDelete } from "./Components/Deleteicon";

const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const App = () => {
  return (
    <div>
      <DisplayCal />
    </div>
  );
};

const DisplayCal = () => {
  const [Input, SetInput] = useState("");

  // Handle numbers
  function HandleClick(value) {
    SetInput((prev) => prev + value);
  }

  // Handle operators
  function HandleOperation(op) {
    SetInput((prev) => prev + " " + op + " ");
  }

  // Handle equal (=)
  function HandleEqual() {
    try {
      // Replace custom symbols with JS operators
      const expression = Input.replace(/x/g, "*").replace(/÷/g, "/");
      const result = eval(expression);
      SetInput(result.toString());
    } catch {
      alert("Invalid expression");
    }
  }

  // Handle percentage
  function HandlePercent() {
    if (!Input) return;
    try {
      const value = parseFloat(Input) / 100;
      SetInput(value.toString());
    } catch {
      alert("Invalid percent");
    }
  }

  // Handle delete (backspace)
  function HandleDelete() {
    SetInput((a) => a.slice(0, -1));
  }

  // Handle clear (C)
  function HandleClear() {
    SetInput("");
  }

  return (
    <div className="header">
      {/* Display */}
      <input type="text" value={Input} readOnly />
      {/* <RadixIconsRulerHorizontal className="icon" /> */}
      <span>
        <MynauiDelete
          className={`deleteicon ${Input.length > 0 ? "active" : ""}`}
          onClick={HandleDelete}
        />
      </span>

      <hr />
      <br />

      {/* Buttons */}
      <div className="main-header">
        {Numbers.map((num) => (
          <button key={num} onClick={() => HandleClick(num)}>
            {num}
          </button>
        ))}

        <button className="operators" onClick={HandlePercent}>
          %
        </button>
        <button className="operators" onClick={() => HandleOperation("+")}>
          +
        </button>
        <button className="operators" onClick={() => HandleOperation("-")}>
          -
        </button>
        <button className="operators" onClick={() => HandleOperation("÷")}>
          ÷
        </button>
        <button className="operators" onClick={() => HandleOperation("x")}>
          &times;
        </button>

        <button onClick={() => HandleOperation("+/-")}>+/-</button>
        <button onClick={() => HandleClick(".")}>.</button>
        <button style={{ color: "rgba(209, 57, 27, 1)" }} onClick={HandleClear}>
          C
        </button>
        <button onClick={() => HandleOperation("()")}>( )</button>
        <button className="equalsign" onClick={HandleEqual}>
          =
        </button>
      </div>
    </div>
  );
};

export default App;
