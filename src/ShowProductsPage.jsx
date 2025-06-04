// src/ShowProductsPage.jsx

import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Stack, Breadcrumb, Text, Link } from "@chakra-ui/react";
import MainNavbar from "src/components/MainNavbar";
import Footer from "./components/Footer";
import ShowProducts from "./components/ShowProducts";
import Filters from "./components/Filters";

export default function ShowProductsPage({ cart }) {
  const { categoryId, subCategoryId } = useParams();
  const [productos, setProductos] = useState([]);

  // --------------- Diccionarios en este mismo componente ---------------
  const CATEGORY_NAMES = {
    1: "PCs Armadas",
    2: "Placas de Video",
    3: "Procesadores",
    4: "Componentes",
    5: "Almacenamiento",
    6: "Memorias RAM",
    7: "Teclados",
    8: "Mouses",
    9: "Auriculares",
    10: "Accesorios",
    11: "Streaming",
    12: "Otros",
    13: "Notebooks",
    14: "Monitores",
  };

  const SUBCATEGORY_NAMES = {
    1: "PC Gamer",
    2: "PC Oficina",
    3: "PC Workstation",
    4: "AMD Radeon",
    5: "NVIDIA Geforce",
    6: "AMD Procesadores",
    7: "Intel Procesadores",
    8: "Motherboards",
    9: "Fuentes",
    10: "Refrigeración",
    11: "Gabinetes",
    12: "Conectividad y Redes",
    13: "Discos SATA",
    14: "Discos Externos",
    15: "Discos SSD",
    16: "DDR3",
    17: "DDR4",
    18: "DDR5",
    19: "SODIMM DDR4",
    20: "SODIMM DDR5",
    21: "Teclados Inalámbricos",
    22: "Teclados Gamer",
    23: "Teclados USB",
    24: "Mouses Inalámbricos",
    25: "Mouses Gamer",
    26: "Mouses USB",
    27: "Auriculares Inalámbricos",
    28: "Auriculares Gamer",
    29: "Auriculares con Micrófono",
    30: "Mousepads",
    31: "Joysticks",
    32: "Webcams",
    33: "Micrófonos",
    34: "Capturadoras de Video",
    35: "Stream Decks",
    36: "Pendrives",
    37: "Sillas Gamer",
    38: "Impresoras",
  };
  // -----------------------------------------------------------------------

  // Determinar texto para el breadcrumb
  let breadcrumbLabel;
  let breadcrumbLink;
  if (subCategoryId) {
    breadcrumbLabel = SUBCATEGORY_NAMES[subCategoryId] || `Subcategoría ${subCategoryId}`;
    breadcrumbLink = `/products/subCategory/${subCategoryId}`;
  } else if (categoryId) {
    breadcrumbLabel = CATEGORY_NAMES[categoryId] || `Categoría ${categoryId}`;
    breadcrumbLink = `/products/category/${categoryId}`;
  } else {
    breadcrumbLabel = "Todos los productos";
    breadcrumbLink = "/products";
  }

  // Handler de filtros (igual que antes)
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
    setProductos(filtered);
  };

  return (
    <Box bg={"#170d20"}>
      <MainNavbar cart={cart} />

      {/* Breadcrumb */}
      <Stack mt={"30px"} ml={"50px"}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                as={RouterLink}
                to="/"
                fontSize="xl"
                color={"white"}
                textDecoration={"none"}
                _hover={{ textDecoration: "underline" }}
              >
                Inicio
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator color="white"/>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                as={RouterLink}
                to={breadcrumbLink}
                fontSize="xl"
                color={"white"}
                textDecoration={"none"}
                _hover={{ textDecoration: "underline" }}
              >
                {breadcrumbLabel}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Stack>

      {/* Filtros y listado de productos */}
      <Box display={{ base: "block", md: "flex" }}>
        <Filters onApplyFilters={handleApplyFilters} />
        <ShowProducts products={productos} setProducts={setProductos} />
      </Box>

      <Footer />
    </Box>
  );
}
