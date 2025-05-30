import MainNavbar from "./components/MainNavbar";
import { Breadcrumb, Stack, Box, Flex, Container } from "@chakra-ui/react";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductSection from "./components/ProductSection";

export default function ProductPage() {

    const images = [
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-0.jpg",
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-1.jpg",
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-2.jpg",
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-3.jpg",
    ];

    const reviews = [
    {
      rating: 3,    
      text: "Regular, todo ok pero hasta ahi.",
      date: "14 sep. 2024",
      helpful: 0,
    },
    {
      rating: 4.5,
      text: "Muy buena placa. Justo lo que necesitábamos para los chicos y el trabajo.",
      date: "22 abr. 2025",
      helpful: 0,
    },
  ];

     const product = {
        code: "VGA2339",
        name: "VIDEO GEFORCE RTX 3050 8GB MSI VENTUS 2X XS OC",
        description: `Esta es una tarjeta gráfica de última generación,
                      ideal para gaming en 1080p y 1440p. Cuenta con 8 GB de GDDR6,
                      un bus de memoria de 128 bit y soporte para ray-tracing en
                      tiempo real.

                      Esta es una tarjeta gráfica de última generación,
                      ideal para gaming en 1080p y 1440p. Cuenta con 8 GB de GDDR6,
                      un bus de memoria de 128 bit y soporte para ray-tracing en
                      tiempo real.`,     
    };



    const related = [
    {
      id: 1,
      url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-gt-210-msi-1gb-ddr3-0.jpg",
      name: "VIDEO GEFORCE GT 210 MSI 1GB DDR3",
      price: "$41.989,95",
      oldPrice: "$46.188,95",
    },
    {
      id: 2,
        url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-gt-710-2gb-msi-lp-0.jpg",
      name: "VIDEO GEFORCE GT 710 2GB MSI LP",
      price: "$72.369,96",
      oldPrice: "$79.606,91",
    },
    {
      id: 3,
        url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3060-12gb-msi-ventus-2x-oc-0.jpg",
      name: "VIDEO GEFORCE RTX 3060 12GB MSI VENTUS 2X OC",
      price: "$476.560,00",
      
    },
    {
      id: 4,
        url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3060-12gb-asus-dual-v2-oc-edition-0.jpg",
      name: "VIDEO GEFORCE RTX 3060 12GB ASUS DUAL V2 OC",
      price: "$472.069,94",
      oldPrice: "$519.276,98",
    },
  ];



  return (
    <Flex direction="column" minH="100vh" backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)">
      {/* Navbar */}
      <MainNavbar />

      {/* Contenido principal */}
      <Box flex="1" pt="20px" px={{ base: 0, md: 12 }} mt="20px">
        <Box
        as="main"
        flex="1"
        pt="20px"
        px={{base: 0, md: 12}}
        mt="20px"
        mx="auto"
        maxW={{ base: "100%", md: "1200px"}}
        mb="70px"
        >         
          <Breadcrumb.Root mt={-14} >
            <Breadcrumb.List
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
            
            >
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="#"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"
                >
                  HOME
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="#"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"
                >
                  PLACAS DE VIDEO
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="#"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"                
                >
                  NVIDIA
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink
                  fontSize="sm"
                  color="#EC1877"
                  wordBreak="normal"
                  overflowWrap="break-word"
                  maxW="100%"

                >
                  VIDEO GEFORCE RTX 3050 8GB MSI VENTUS 2X XS OC
                </Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
       

        {/* DIV ENORME: aquí va toda la info de producto */}
        <Box
          id="product-container"
          bg="white" 
          borderWidth="0px"
          p={6}
        >
        
            <ProductSection images={images} reviews={reviews} product={product} related={related} stockLevel="low" ></ProductSection> 

        </Box>
      </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}

