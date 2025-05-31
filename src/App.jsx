import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Signup from "./Signup";
import Register from "./Register";
import ShowProductsPage from "./ShowProductsPage";

import ProductPage from "./ProductPage";
import { system } from './theme';


import AboutUsPage from "./AboutUsPage";
import CartPage from "./CartPage";
import PaymentPage from "./PaymentPage";
import { useState, useEffect } from "react";


function App() {
  const [Token_usuario, SetToken_usuario] = useState("");
  const [Cart, SetCart] = useState([]);
  useEffect(() => {
    SetCart([
      {
        index: 1,
        id_product: "10111",
        product_name: "smartphone",
        amount: 2,
        price: 100,
        url: "aa",
        condition: "new",
      },
      {
        index: 2,
        id_product: "10112",
        product_name: "smartphone",
        amount: 2,
        price: 100,
        url: "aa",
        condition: "new",
      },
      {
        index: 3,
        id_product: "10113",
        product_name: "smartphone",
        amount: 2,
        price: 100,
        url: "aa",
        condition: "new",
      },
    ]);
  }, []);
  console.log(Token_usuario);
  return (

    <ChakraProvider value={system}>      
      <Router>

        <Routes>    
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/products" element={<ShowProductsPage />}></Route>

          <Route path="/product-desc" element={<ProductPage />}></Route>

          <Route path="/" element={<LandingPage cart={Cart} />}></Route>
          <Route
            path="/cart"
            element={<CartPage carrito={Cart} setcarrito={SetCart} />}
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup token={Token_usuario} settoken={SetToken_usuario} />
            }
          ></Route>
          <Route
            path="/register"
            element={
              <Register token={Token_usuario} settoken={SetToken_usuario} />
            }
          ></Route>
          <Route path="/delivery" element={<PaymentPage cart={Cart} />}></Route>

          <Route
            path="/products"
            element={<ShowProductsPage cart={Cart} />}
          ></Route>
          <Route path="/us" element={<AboutUsPage cart={Cart} />}></Route>

        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;
