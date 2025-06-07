import "../App.css";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box, Text } from "@chakra-ui/react";
import InfoAccordion from "../components/allPages/InfoAccordion";

function AboutUsPage({ cart, type, id_usuario }) {
  return (
    <Box>
      <MainNavbar
        opacity={true}
        cart={cart}
        type={type}
        id_user={id_usuario}
      ></MainNavbar>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
        flexDirection={"column"}
        backgroundColor="#170d20"
        color={"#f1e6f7"}
      >
        <h1>
          <Text>Mas sobre nosotros</Text>
        </h1>
        <InfoAccordion></InfoAccordion>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default AboutUsPage;
