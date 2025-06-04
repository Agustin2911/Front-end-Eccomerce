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
import { useState } from "react";

function ShowProductsPage({ cart, type, id_usuario }) {
  const handleApplyFilters = ({ order, minPrice, maxPrice }) => {
    let filtered = [...productos];

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (order[0] === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (order[0] === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    console.log(filtered);
    setProductos(filtered);
  };

  const [productos, setProductos] = useState([]);

  return (
    <Box bg={"#170d20"}>
      <MainNavbar cart={cart} type={type} id_user={id_usuario}></MainNavbar>

      <Stack mt={"30px"} ml={"50px"}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                href="/"
                fontSize="xl"
                color={"white"}
                textDecoration={"none"}
              >
                Inicio
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
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Stack>
      <Box display={{ base: "block ", md: "flex" }}>
        <Filters onApplyFilters={handleApplyFilters}></Filters>
        <ShowProducts
          products={productos}
          setProducts={setProductos}
        ></ShowProducts>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default ShowProductsPage;
