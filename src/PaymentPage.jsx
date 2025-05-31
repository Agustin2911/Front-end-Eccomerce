import Footer from "./components/footer";
import MainNavbar from "./components/MainNavbar";
import Formdelivery from "./components/FormPayment";

function PaymentPage({ cart }) {
  return (
    <div style={{ background: "#170d20" }}>
      <MainNavbar opacity={true} cart={cart}></MainNavbar>
      <Formdelivery cart={cart}></Formdelivery>
      <Footer></Footer>
    </div>
  );
}

export default PaymentPage;
