import { useState } from "react";
import { Link } from "react-router-dom";
const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const Qoute = () => {
  const [datanya, setdatanya] = useState("");

  const ambil = () => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        let randomm = Math.floor(Math.random() * data.quotes.length);
        setdatanya(data.quotes[randomm]);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="isinya">
            <h3>"</h3>
            <h1>{datanya.quote}</h1>
            <h3>"</h3>
            <p>{datanya.author}</p>
          </div>
          <div>
            <button onClick={ambil}> Get Quote </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/calculator">Calculator</Link>

        <Link to="/drum">Drum</Link>
        <Link to="/mark">Mark</Link>
        <Link to="/clock">CLock</Link>
      </div>
    </div>
  );
};

export default Qoute;
