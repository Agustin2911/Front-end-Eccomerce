import "./App.css";
import MainNavbar from "src/components/MainNavbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box } from "@chakra-ui/react";
import CarouselShow from "./components/CarouselShow";
import Categorys from "./components/Categorys";

const image = [
  "https://imgs.search.brave.com/pt-3SjlvGtwVQ82qLglsURzTCld1BajFvtQ2gXc2Yu4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/dHJpcGkudm4vY2Ru/LWNnaS9pbWFnZS93/aWR0aD03MDAsaGVp/Z2h0PTcwMC9odHRw/czovL2ltZy50aHV0/aHVhdHBoYW5tZW0u/dm4vdXBsb2Fkcy8y/MDE4LzEwLzE2L21v/LWhpbmgtdHJvbmct/Z2FtZS1taW5lY3Jh/ZnQtY2hvLW1hbi1o/aW5oLW1heS10aW5o/XzA0MTAwMjg0MS5q/cGc",
  "https://imgs.search.brave.com/pt-3SjlvGtwVQ82qLglsURzTCld1BajFvtQ2gXc2Yu4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/dHJpcGkudm4vY2Ru/LWNnaS9pbWFnZS93/aWR0aD03MDAsaGVp/Z2h0PTcwMC9odHRw/czovL2ltZy50aHV0/aHVhdHBoYW5tZW0u/dm4vdXBsb2Fkcy8y/MDE4LzEwLzE2L21v/LWhpbmgtdHJvbmct/Z2FtZS1taW5lY3Jh/ZnQtY2hvLW1hbi1o/aW5oLW1heS10aW5o/XzA0MTAwMjg0MS5q/cGc",
];

function LandingPage() {
  return (
    <Box>
      <MainNavbar opacity={true}></MainNavbar>
      <CarouselShow images={image}></CarouselShow>
      <Categorys></Categorys>
      <Box h={{ base: "600px" }}></Box>
      <Footer></Footer>
    </Box>
  );
}

export default LandingPage;
