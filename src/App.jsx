import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { system } from "./theme";
import { useState, useEffect } from "react";

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
  const [Token_usuario, SetToken_usuario] = useState("");
  const [Cart, SetCart] = useState([]);
  const [id_usuario, setId_usuario] = useState(1);
  const [image_path, setImage_path] = useState(null);
  const [type, SetType] = useState(null);

  useEffect(() => {
    console.log("imagen:" + image_path);
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
          <Route
            path="/product-desc/:id_product"
            element={
              <ProductPage
                cart={Cart}
                setCart={SetCart}
                type={type}
                id_usuario={id_usuario}
              />
            }
          ></Route>


                    

          <Route path="/product-desc/:id_product" element={<ProductPage cart={Cart} setCart={SetCart} />}></Route>

          <Route path="/publish" element={<PublishPage cart={Cart} id_user={id_usuario}/>}></Route>
            
          <Route path="new-shop" element={<NewShopPage cart={Cart} id_user={id_usuario}/>}></Route>

          <Route
            path="/"
            element={
              <LandingPage cart={Cart} type={type} id_usuario={id_usuario} />
            }
          ></Route>

          <Route
            path="/cart"
            element={
              <CartPage
                carrito={Cart}
                setcarrito={SetCart}
                type={type}
                id_usuario={id_usuario}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                token={Token_usuario}
                settoken={SetToken_usuario}
                setId_usuario={setId_usuario}
                setImage_path={setImage_path}
                SetType={SetType}
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
                setType={SetType}
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
                type={type}
              />
            }
          ></Route>

          <Route

            path="/products"
            element={<ShowProductsPage cart={Cart} />}

          ></Route>
          
          <Route
            path="/products/category/:categoryId"
            element={<ShowProductsPage cart={Cart} />}
          >
          </Route>
          <Route
            path="/products/subCategory/:subCategoryId"
            element={
              <ShowProductsPage
                cart={Cart}
                type={type}
                id_usuario={id_usuario}
              />
            }
          ></Route>
          <Route
            path="/us"
            element={
              <AboutUsPage cart={Cart} type={type} id_usuario={id_usuario} />
            }
          ></Route>
          <Route
            path="/myorders/:idUser"
            element={
              <MyOrders cart={Cart} type={type} id_usuario={id_usuario} />
            }
          ></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
