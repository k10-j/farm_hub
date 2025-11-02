import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./website/Components/Navbar";
import Home from "./website/pages/Home";
import Equipment from "./website/pages/Equipement";
import Footer from "./website/Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<Equipment />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
