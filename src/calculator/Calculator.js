import React, { useState } from "react";

const Calculator = () => {
  const [calculate, setcalculate] = useState("");
  const [result, setresult] = useState("");

  const arit = ["/", "*", "+", "-", "."];

  const kalkulasi = (value) => {
    if (
      (arit.includes(value) && calculate === "") ||
      (arit.includes(value) && arit.includes(calculate.slice(-1)))
    ) {
      return;
    }
    setcalculate(calculate + value);
    if (!arit.includes(value)) {
      setresult(eval(calculate + value).toString());
    }
  };

  const ambilangka = () => {
    let angka = [];

    for (let i = 0; i < 10; i++) {
      angka.push(
        <button onClick={() => kalkulasi(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return angka;
  };

  const jadinya = () => {
    setcalculate(eval(calculate).toString());
  };

  const kurangsatu = () => {
    if (calculate == "") {
      return;
    }

    const barbar = calculate.slice(0, -1);
    setcalculate(barbar);
  };

  const semuahapus = () => {
    setcalculate("");
    setresult("");
  };

  return (
    <div>
      <div className="container">
        <div className="display">
          <div>
            {result ? <span>({result})</span> : <span>(0)</span>}
            {calculate || "0"}
          </div>
          <div className="buttonatas">
            <button onClick={() => kalkulasi("/")}>/</button>
            <button onClick={() => kalkulasi("*")}>X</button>
            <button onClick={() => kalkulasi("-")}>-</button>
            <button onClick={() => kalkulasi("+")}>+</button>
            <button onClick={() => kurangsatu()}>DEL</button>
          </div>
          <div>
            {ambilangka()}
            <button onClick={() => kalkulasi("0")}>0</button>
            <button onClick={() => kalkulasi(".")}>.</button>
            <button onClick={jadinya}>=</button>
          </div>
          <button onClick={() => semuahapus()}>Hapus semua</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
