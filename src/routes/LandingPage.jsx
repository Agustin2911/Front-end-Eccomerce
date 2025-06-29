import "../App.css";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box, Image } from "@chakra-ui/react";
import CarouselShow from "../components/landingPage/CarouselShow";
import Categorys from "../components/landingPage/Categorys";
import { useState, useEffect } from "react";
import { fetchUserShops } from "../features/fetch/fetchUserShops";


import BrandProductShowcase from "../components/landingPage/BrandProductShowcase";
import FeaturedProducts from "../components/landingPage/FeaturedProducts";
import Loader from "../components/landingPage/Loader";

import SlideOne from "../assets/carrusel.svg";
import SlideTwo from "../assets/carrusel1.svg";
import SlideThree from "../assets/carrusel2.svg";

import VideoA from "../assets/asusRog.mp4";
import BG_A from "../assets/asusBG.png";
import VideoB from "../assets/corsairGabo.mp4";
import BG_B from "../assets/corsairBG.svg";
import VideoC from "../assets/samsungOddysey.mp4";
import BG_C from "../assets/samsungBG.svg";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const images = [SlideOne, SlideTwo, SlideThree];

function LandingPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);


  console.log("🔍 ShowProductsPage: id_user =", user.id_usuario);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ( user.type === "seller"){
        dispatch(fetchUserShops());
    }
  }, [dispatch, user.type]);


  return (
    <Box
      w="100%"
      minH="100vh"
      backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
      position="relative"
    >
      {/* Loader with transition */}
      <Loader isLoading={loading} />

      {/* Main content */}
      <Box
        opacity={loading ? 0 : 1}
        transition="opacity 0.8s ease-in-out"
        transitionDelay={loading ? "0s" : "0.3s"}
        pointerEvents={loading ? "none" : "auto"}
      >
        <MainNavbar opacity={true} />
        <ToastContainer />
        <CarouselShow images={images} />
        <Categorys />

        {/* ====== FEATURED PRODUCTS ====== */}
        <FeaturedProducts
          productIds={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        />

        {/* ====== PRODUCT SHOWCASES ====== */}
        <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
          <BrandProductShowcase
            productIds={[1, 2, 3, 4]}
            videoSrc={VideoA}
            bgImage={BG_A}
            videoLeft={true}
            exploreText="Explora ROG"
          />
        </Box>

        <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
          <BrandProductShowcase
            productIds={[5, 6, 7, 8]}
            videoSrc={VideoB}
            bgImage={BG_B}
            videoLeft={false}
            exploreText="Explora Corsair"
          />
        </Box>

        <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
          <BrandProductShowcase
            productIds={[9, 10, 11, 12]}
            videoSrc={VideoC}
            bgImage={BG_C}
            videoLeft={true}
            exploreText="Explora Samsung"
          />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default LandingPage;
