import Footer from "../components/allPages/Footer";
import MainNavbar from "../components/allPages/MainNavbar";
import Formdelivery from "../components/FormPayment";

function PaymentPage() {
  return (
    <div style={{ background: "#170d20" }}>
      <MainNavbar opacity={true}></MainNavbar>
      <Formdelivery></Formdelivery>
      <Footer></Footer>
    </div>
  );
}

export default PaymentPage;
