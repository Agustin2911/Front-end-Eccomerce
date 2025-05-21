import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Signup from "./Signup";
import Register from "./Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/register" element={<Register />}></Route>  
        </Routes>
      </Router>
    </>
  );
}

export default App;
