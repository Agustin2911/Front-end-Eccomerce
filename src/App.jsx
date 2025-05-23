import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Signup from "./Signup";
import Register from "./Register";
import ShowProductsPage from "./ShowProductsPage";
import AboutUsPage from "./AboutUsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/products" element={<ShowProductsPage />}></Route>
          <Route path="/us" element={<AboutUsPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
