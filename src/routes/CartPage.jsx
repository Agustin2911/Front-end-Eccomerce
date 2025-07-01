import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartComponent from "../components/cart/CartComponent";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";

function CartPage() {
  const navigate = useNavigate();
  
  // PROTECCIÓN DE RUTA - Obtener token y tipo de usuario
  const { token, type } = useSelector((state) => state.user);

  // PROTECCIÓN DE RUTA - Verificar autenticación y tipo de usuario
  useEffect(() => {
    if (!token || type !== "buyer") {
      navigate("/signup", { replace: true });
      return;
    }
  }, [token, type, navigate]);

  // PROTECCIÓN DE RUTA - No renderizar nada si no está autenticado
  if (!token || type !== "buyer") {
    return null; // O un loader mientras redirige
  }

  return (
    <div>
      <MainNavbar></MainNavbar>
      <CartComponent></CartComponent>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
