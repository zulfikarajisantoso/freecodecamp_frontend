import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clock from "./build25CLOCK/Clock";
import Calculator from "./calculator/Calculator";
import Drum from "./drumpad/Drum";
import Markdown from "./markdown/Markdown";
import Qoute from "./quoterandom/Qoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Qoute />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/drum" element={<Drum />} />
        <Route path="/mark" element={<Markdown />} />
        <Route path="/clock" element={<Clock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
