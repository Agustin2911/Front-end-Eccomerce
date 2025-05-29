import MainNavbar from "./components/MainNavbar";
import { Breadcrumb, Stack, Box, Flex, Container } from "@chakra-ui/react";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductSection from "./components/ProductSection";

export default function ProductPage() {
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
          <Breadcrumb.Root>
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
        
            <ProductSection></ProductSection> 

        </Box>
      </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}

