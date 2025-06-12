import Footer from "../components/allPages/Footer";
import MainNavbar from "../components/allPages/MainNavbar";
import Formdelivery from "../components/FormPayment";

function PaymentPage({ cart, id_usuario, Token_usuario, setcart, type }) {
  return (
    <div style={{ background: "#170d20" }}>
      <MainNavbar
        opacity={true}
        cart={cart}
        type={type}
        id_user={id_usuario}
      ></MainNavbar>
      <Formdelivery
        cart={cart}
        setcart={setcart}
        id_usuario={id_usuario}
        Token_usuario={Token_usuario}
      ></Formdelivery>
      <Footer></Footer>
    </div>
  );
}

export default PaymentPage;
