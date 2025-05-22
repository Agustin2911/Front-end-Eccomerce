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
      <Box flex="1" pt="20px" px={{ base: 4, md: 12 }} mt="20px">
      <Container maxW="1200px" mx="auto"  mb="70px">
        <Stack direction="row" spacing={2} ml={-3} mb={-2}>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="#"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
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
                >
                  NVIDIA
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink
                  fontSize="sm"
                  color="#EC1877"
                >
                  VIDEO GEFORCE RTX 3050 8GB MSI VENTUS 2X XS OC
                </Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Stack>

        {/* DIV ENORME: aquí va toda la info de producto */}
        <Box
          id="product-container"
          bg="white" 
          borderWidth="0px"
          p={6}
          ml={{ base: 0, md:"20px"}}
        >
        
            <ProductSection></ProductSection> 

        </Box>
      </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}

