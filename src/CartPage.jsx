import MainNavbar from "./components/MainNavbar";
import Footer from "./components/footer";
import CartComponent from "./components/CartComponent";

function CartPage() {
  return (
    <div>
      <MainNavbar opacity={true}></MainNavbar>
      <CartComponent></CartComponent>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
