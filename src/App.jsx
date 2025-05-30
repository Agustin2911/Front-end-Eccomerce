import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Signup from "./Signup";
import Register from "./Register";
import ShowProductsPage from "./ShowProductsPage";
import ProductPage from "./ProductPage";
import { system } from './theme';


function App() {
  return (

    <ChakraProvider value={system}>      
      <Router>
        <Routes>    
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/products" element={<ShowProductsPage />}></Route>
          <Route path="/product-desc" element={<ProductPage />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;
