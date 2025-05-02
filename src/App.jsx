import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./Hooks/ShopContext";
import Homepage from "../Pages/Homepage";
import Checkout from "../Pages/Checkout";
import Product from "../Pages/Product"
import "./index.css";

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Product/:id" element={<Product />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;