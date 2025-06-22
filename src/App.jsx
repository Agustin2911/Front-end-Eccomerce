import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { system } from "./theme";
import { useState, useEffect } from "react";

import AdminPage from "./routes/AdminPage";
import LandingPage from "./routes/LandingPage.jsx";
import Signup from "./routes/Signup.jsx";
import Register from "./routes/Register.jsx";
import ShowProductsPage from "./routes/ShowProductsPage.jsx";
import ProductPage from "./routes/ProductPage";
import AboutUsPage from "./routes/AboutUsPage.jsx";
import CartPage from "./routes/CartPage";
import PaymentPage from "./routes/PaymentPage";
import MyOrders from "./routes/MyOrders.jsx";
import PublishPage from "./routes/PublishPage";
import NewShopPage from "./routes/NewShopPage";

function App() {
  return (
    <ChakraProvider value={system}>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage />}></Route>

          <Route
            path="/product-desc/:id_product"
            element={<ProductPage />}
          ></Route>

          <Route path="/publish/:id_user" element={<PublishPage />}></Route>

          <Route path="new-shop" element={<NewShopPage />}></Route>

          <Route path="/" element={<LandingPage />}></Route>

          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/delivery" element={<PaymentPage />}></Route>

          <Route path="/products" element={<ShowProductsPage />}></Route>

          <Route
            path="/products/category/:categoryId"
            element={<ShowProductsPage />}
          ></Route>
          <Route
            path="/products/subCategory/:subCategoryId"
            element={<ShowProductsPage />}
          ></Route>
          <Route path="/us" element={<AboutUsPage />}></Route>
          <Route path="/myorders/:idUser" element={<MyOrders />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
