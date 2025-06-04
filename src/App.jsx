import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Signup from "./Signup";
import Register from "./Register";
import ShowProductsPage from "./ShowProductsPage";

import ProductPage from "./ProductPage";
import { system } from "./theme";

import AboutUsPage from "./AboutUsPage";
import CartPage from "./CartPage";
import PaymentPage from "./PaymentPage";
import { useState, useEffect } from "react";
import MyOrders from "./MyOrders.jsx";

function App() {
  const [Token_usuario, SetToken_usuario] = useState("");
  const [Cart, SetCart] = useState([]);
  const [id_usuario, setId_usuario] = useState(0);
  const [image_path, setImage_path] = useState(null);

  useEffect(() => {
    SetCart([
      {
        index: 1,
        id_product: 1,
        product_name: "samsung 20 pulgadas",
        amount: 2,
        price: 1000,
        url: "urlrandom",
        condition: "new",
        description: "aaaaa",
        discount: 10,
        discount_state: "false",
      },
    ]);
  }, []);

  return (
    <ChakraProvider value={system}>
      <Router>

        <Routes>             

          <Route path="/product-desc/:id_product" element={<ProductPage cart={Cart} setCart={SetCart} />}></Route>

          <Route path="/" element={<LandingPage cart={Cart} />}></Route>
          <Route
            path="/cart"
            element={<CartPage carrito={Cart} setcarrito={SetCart} />}
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                token={Token_usuario}
                settoken={SetToken_usuario}
                setId_usuario={setId_usuario}
                setImage_path={setImage_path}
              />
            }
          ></Route>
          <Route
            path="/register"
            element={
              <Register
                token={Token_usuario}
                settoken={SetToken_usuario}
                setId_usuario={setId_usuario}
                setImage_path={setImage_path}
              />
            }
          ></Route>
          <Route
            path="/delivery"
            element={
              <PaymentPage
                cart={Cart}
                id_usuario={id_usuario}
                Token_usuario={Token_usuario}
                setcart={SetCart}
              />
            }
          ></Route>

          <Route
            path="/products/category/:categoryId"
            element={<ShowProductsPage cart={Cart} />}
          ></Route>
          <Route
            path="/products/subCategory/:subCategoryId"
            element={<ShowProductsPage cart={Cart} />}
          ></Route>
          <Route path="/us" element={<AboutUsPage cart={Cart} />}></Route>
          <Route path="/myorders/:idUser" element={<MyOrders />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
