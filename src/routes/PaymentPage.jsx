import Footer from "../components/allPages/Footer";
import MainNavbar from "../components/allPages/MainNavbar";
import Formdelivery from "../components/FormPayment";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useSelector } from "react-redux";


function PaymentPage() {
     
    const token = useSelector((state) => state.userSlice?.token);
    const type  = useSelector((state) => state.userSlice?.type);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token || type !== "buyer") {
            navigate("/signup", { replace: true });
            return;
        }
    }, [token, type, navigate]);


  return (
    <div style={{ background: "#170d20" }}>
      <MainNavbar opacity={true}></MainNavbar>
      <Formdelivery></Formdelivery>
      <Footer></Footer>
    </div>
  );
}

export default PaymentPage;
