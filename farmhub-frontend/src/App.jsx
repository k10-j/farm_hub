import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./website/Components/Navbar";
import Home from "./website/pages/Home";
import Equipment from "./website/pages/Equipement";
import Footer from "./website/Components/Footer";
import About from "./website/pages/About";
import Marketplace from "./website/pages/MarketPlace";
import ProductPage from "./website/pages/product/[id]";
import CartProvider  from './website/context/CartProvider';

function App() {
  return (
    <BrowserRouter>
     <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipement" element={<Equipment />} />
        <Route path="/About" element={<About />} />
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/equipement" element={<Equipment/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      </CartProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
