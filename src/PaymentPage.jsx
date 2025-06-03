import Footer from "./components/footer";
import MainNavbar from "./components/MainNavbar";
import Formdelivery from "./components/FormPayment";

function PaymentPage({ cart, id_usuario, Token_usuario }) {
  return (
    <div style={{ background: "#170d20" }}>
      <MainNavbar opacity={true} cart={cart}></MainNavbar>
      <Formdelivery
        cart={cart}
        id_usuario={id_usuario}
        Token_usuario={Token_usuario}
      ></Formdelivery>
      <Footer></Footer>
    </div>
  );
}

export default PaymentPage;
