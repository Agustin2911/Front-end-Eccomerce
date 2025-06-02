import "./App.css";
import MainNavbar from "src/components/MainNavbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box } from "@chakra-ui/react";
import CarouselShow from "./components/CarouselShow";
import Categorys from "./components/Categorys";

import BrandProductShowcase from "./components/BrandProductShowcase";
import FeaturedProducts from "./components/FeaturedProducts";

import SlideOne from "./assets/carrusel.svg";
import SlideTwo from "./assets/carrusel1.svg";
import SlideThree from "./assets/carrusel2.svg";

// >>> Showcase assets <<<
import VideoA from "./assets/asusRog.mp4";
import BG_A from "./assets/asusBG.png";
import VideoB from "./assets/corsairGabo.mp4";
import BG_B from "./assets/corsairBG.svg";
import VideoC from "./assets/samsungOddysey.mp4";
import BG_C from "./assets/samsungBG.svg";

// >>> Sample product arrays <<<
const productsA = [
  {
    id: 1,
    image:
      "https://www.comeros.com.ar/wp-content/uploads/2025/04/ROG-Astral-GeForce-RTX%E2%84%A2-5090-32GB-GDDR7.jpg",
    name: "Asus GeForce RTX 5090 ROG Astral OC 32GB GDDR7",
    price: "$4.997.819",
  },
  {
    id: 2,
    image:
      "https://img.overclockers.co.uk/images/MON-ASU-03121/331f0ab69237193b6e5cad9a69fbce37.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=594&h=594",
    name: "ASUS ROG Swift 39'' PG39WCDM 3440x1440 OLED 240Hz 0.03ms",
    price: "$1.846.938",
    oldPrice: "$2.248.341",
  },
  {
    id: 3,
    image:
      "https://img.overclockers.co.uk/images/COO-ASU-03398/680c163f47e16489a8080d6e9c951e37.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=594&h=594",
    name: "ASUS ROG Ryujin III 360 Extreme ARGB AIO 60mm",
    price: "$476.560,00",
    oldPrice: "$524.216,00",
  },
  {
    id: 4,
    image:
      "https://img.overclockers.co.uk/images/MOT-ASU-03841/3a87bca917034c3b7f0f275576b644f4.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=594&h=594",
    name: "Asus ROG STRIX B850-F GAMING WIFI DDR5 ATX Motherboard",
    price: "$401.069,94",
    oldPrice: "$490.276,98",
  },
];
const productsB = [
  {
    id: 1,
    image:
      "https://img.overclockers.co.uk/images/MEM-CRS-05106/2375d8ba29e27cd5c56971689165ea3f.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair Dominator Titanium RGB EXPO 64GB (2X32GB) DDR5",
    price: "$309.103",
    oldPrice: "$332.134",
  },
  {
    id: 2,
    image:
      "https://img.overclockers.co.uk/images/CAS-CRS-01882/51d8e55bd445fb1ad3d69aa0d0858b90.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair iCUE LINK 2500X RGB Micro ATX Dual Chamber PC Case",
    price: "$225.103",
    oldPrice: "$241.934",
  },
  {
    id: 3,
    image:
      "https://img.overclockers.co.uk/images/COO-CRS-03457/c4794029b529f116a713345246a6e3cd.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair iCUE LINK TITAN 360 RX LCD RGB Black AIO - 360mm",
    price: "$432.560",
  },
  {
    id: 4,
    image:
      "https://img.overclockers.co.uk/images/SP-03W-CS/b1e1a2a8de21d56251d10878347843dd.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair VIRTUOSO RGB Wireless Gaming Headset Black Carbon",
    price: "$245.154",
    oldPrice: "$270.795",
  },
];
const productsC = [
  {
    id: 1,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-01622/3fcb008ba6719d451bf671bda0c677c9.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 55'' LS55CG970NUXXU G97NC 3840x2160 VA 165Hz 1ms Mini-LED",
    price: "$5.115.626",
    oldPrice: "$6.161.633",
  },
  {
    id: 2,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-00832/d42bec50393ca823ab8deb5ed0ff3685.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 57'' G95NC Odyssey Neo G9 LS57CG952NUXXU 7680x2160 VA 240Hz 1ms HDR",
    price: "$3.908.134",
    oldPrice: "$4.875.151",
  },
  {
    id: 3,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-04279/cc2abe27692394f6697c36a13b1256fe.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 27'' Odyssey G7 LS27DG702EUXXU 3840x2160 IPS 144Hz 1ms ",
    price: "$476.560",
    oldPrice: "$524.216",
  },
  {
    id: 4,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-01620/107cd31be5983f66055bfb47c977f61a.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 32'' LS32BG750NPXXU G75NB 3840x2160 VA Mini-LED 165Hz",
    price: "$1.900.135",
    oldPrice: "$2.245.262",
  },
];
const productsD = [
  {
    id: 1,
    image:
      "https://www.comeros.com.ar/wp-content/uploads/2025/04/ROG-Astral-GeForce-RTX%E2%84%A2-5090-32GB-GDDR7.jpg",
    name: "Asus GeForce RTX 5090 ROG Astral OC 32GB GDDR7",
    price: "$4.997.819",
  },
  {
    id: 2,
    image:
      "https://img.overclockers.co.uk/images/MON-ASU-03121/331f0ab69237193b6e5cad9a69fbce37.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=594&h=594",
    name: "ASUS ROG Swift 39'' PG39WCDM 3440x1440 OLED 240Hz 0.03ms",
    price: "$1.846.938",
    oldPrice: "$2.248.341",
  },
  {
    id: 3,
    image:
      "https://img.overclockers.co.uk/images/COO-ASU-03398/680c163f47e16489a8080d6e9c951e37.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=594&h=594",
    name: "ASUS ROG Ryujin III 360 Extreme ARGB AIO 60mm",
    price: "$476.560,00",
    oldPrice: "$524.216,00",
  },
  {
    id: 4,
    image:
      "https://img.overclockers.co.uk/images/MOT-ASU-03841/3a87bca917034c3b7f0f275576b644f4.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=594&h=594",
    name: "Asus ROG STRIX B850-F GAMING WIFI DDR5 ATX Motherboard",
    price: "$401.069,94",
    oldPrice: "$490.276,98",
  },
  {
    id: 5,
    image:
      "https://img.overclockers.co.uk/images/MEM-CRS-05106/2375d8ba29e27cd5c56971689165ea3f.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair Dominator Titanium RGB EXPO 64GB (2X32GB) DDR5",
    price: "$309.103",
    oldPrice: "$332.134",
  },
  {
    id: 6,
    image:
      "https://img.overclockers.co.uk/images/CAS-CRS-01882/51d8e55bd445fb1ad3d69aa0d0858b90.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair iCUE LINK 2500X RGB Micro ATX Dual Chamber PC Case",
    price: "$225.103",
    oldPrice: "$241.934",
  },
  {
    id: 7,
    image:
      "https://img.overclockers.co.uk/images/COO-CRS-03457/c4794029b529f116a713345246a6e3cd.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair iCUE LINK TITAN 360 RX LCD RGB Black AIO - 360mm",
    price: "$432.560",
  },
  {
    id: 8,
    image:
      "https://img.overclockers.co.uk/images/SP-03W-CS/b1e1a2a8de21d56251d10878347843dd.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Corsair VIRTUOSO RGB Wireless Gaming Headset Black Carbon",
    price: "$245.154",
    oldPrice: "$270.795",
  },
  {
    id: 9,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-01622/3fcb008ba6719d451bf671bda0c677c9.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 55'' LS55CG970NUXXU G97NC 3840x2160 VA 165Hz 1ms Mini-LED",
    price: "$5.115.626",
    oldPrice: "$6.161.633",
  },
  {
    id: 10,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-00832/d42bec50393ca823ab8deb5ed0ff3685.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 57'' G95NC Odyssey Neo G9 LS57CG952NUXXU 7680x2160 VA 240Hz 1ms HDR",
    price: "$3.908.134",
    oldPrice: "$4.875.151",
  },
  {
    id: 11,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-04279/cc2abe27692394f6697c36a13b1256fe.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 27'' Odyssey G7 LS27DG702EUXXU 3840x2160 IPS 144Hz 1ms ",
    price: "$476.560",
    oldPrice: "$524.216",
  },
  {
    id: 12,
    image:
      "https://img.overclockers.co.uk/images/MON-SAM-01620/107cd31be5983f66055bfb47c977f61a.jpg?auto=compress%2Cformat&fit=fill&fill-color=fff&q=70&fill=solid&w=210&h=210",
    name: "Samsung 32'' LS32BG750NPXXU G75NB 3840x2160 VA Mini-LED 165Hz",
    price: "$1.900.135",
    oldPrice: "$2.245.262",
  },
];

const images = [SlideOne, SlideTwo, SlideThree];

function LandingPage({ cart }) {
  return (
    <Box
      w="100%"
      minH="100vh"
      backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      <MainNavbar opacity={true} cart={cart} />
      <CarouselShow images={images} />
      <Categorys />
      {/* ====== FEATURED PRODUCTS ====== */}
      <FeaturedProducts products={productsD} />

      {/* ====== PRODUCT SHOWCASES ====== */}
      <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
        <BrandProductShowcase
          products={productsA}
          videoSrc={VideoA}
          bgImage={BG_A}
          videoLeft={true}
          exploreText="Explora ROG"
        />
      </Box>

      <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
        <BrandProductShowcase
          products={productsB}
          videoSrc={VideoB}
          bgImage={BG_B}
          videoLeft={false}
          exploreText="Explora Corsair"
        />
      </Box>

      <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }}>
        <BrandProductShowcase
          products={productsC}
          videoSrc={VideoC}
          bgImage={BG_C}
          videoLeft={true}
          exploreText="Explora Samsung"
        />
      </Box>

      <Box h={{ base: "600px", md: "800px" }} />
      <Footer />
    </Box>
  );
}

export default LandingPage;
