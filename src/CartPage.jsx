import CartComponent from "./components/CartComponent";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/footer";

function CartPage({ carrito, setcarrito }) {
  return (
    <div>
      <MainNavbar cart={carrito}></MainNavbar>
      <CartComponent cart={carrito} setCart={setcarrito}></CartComponent>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
