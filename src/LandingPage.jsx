import "./App.css";
import MainNavbar from "src/components/MainNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box } from "@chakra-ui/react";

function LandingPage() {
  return (
    <div>
      <MainNavbar opacity={true}></MainNavbar>
      <Box h={{ base: "600px" }}></Box>
      <Footer></Footer>
    </div>
  );
}

export default LandingPage;
