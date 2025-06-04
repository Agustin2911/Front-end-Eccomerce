import CartComponent from "./components/CartComponent";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/footer";

function CartPage({ carrito, setcarrito, type, id_usuario }) {
  return (
    <div>
      <MainNavbar cart={carrito} type={type} id_user={id_usuario}></MainNavbar>
      <CartComponent cart={carrito} setCart={setcarrito}></CartComponent>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
