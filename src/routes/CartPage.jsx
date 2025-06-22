import CartComponent from "../components/cart/CartComponent";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";

function CartPage() {
  return (
    <div>
      <MainNavbar></MainNavbar>
      <CartComponent></CartComponent>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
