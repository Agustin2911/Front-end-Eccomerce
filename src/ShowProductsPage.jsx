import "./App.css";
import MainNavbar from "src/components/MainNavbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box, Flex } from "@chakra-ui/react";
import ShowProducts from "./components/ShowProducts";
import { Row } from "reactstrap";
import Filters from "./components/Filters";
import { Breadcrumb, For, Stack } from "@chakra-ui/react";

function ShowProductsPage({ cart }) {
  const handleApplyFilters = (filters) => {
    // Acá hacés el filtrado con los valores de filters (ej: sort, minPrice, maxPrice)
    console.log("Aplicando filtros:", filters);
  };
  return (
    <Box bg={"#170d20"}>
      <MainNavbar cart={cart}></MainNavbar>
      <Stack mt={"30px"} ml={"50px"}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                href="#"
                fontSize="xl"
                color={"white"}
                textDecoration={"none"}
              >
                Docs
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link
                href="#"
                fontSize="xl"
                color={"white"}
                textDecoration={"none"}
              >
                Components
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink fontSize="xl">
                Props
              </Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Stack>
      <Box display={{ base: "block ", md: "flex" }}>
        <Filters onApplyFilters={handleApplyFilters}></Filters>
        <ShowProducts></ShowProducts>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default ShowProductsPage;
