// src/components/ShowProducts.jsx

import React, { useEffect, useState } from "react";
import { Box, Grid, Flex, Text } from "@chakra-ui/react";
import LandingProductCard from "./LandingProductCard";
import { useParams, useSearchParams } from "react-router-dom";

export default function ShowProducts({ products, setProducts }) {
  const { categoryId, subCategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [error, setError] = useState(null);

  useEffect(() => {
    let endpoint = "";

    // 1) Si hay un término de búsqueda, pedimos todos los productos
    if (searchTerm.trim()) {
      endpoint = `http://localhost:1273/product`;

    // 2) Si no buscamos, pero hay subCategoryId, usamos ese endpoint
    } else if (subCategoryId) {
      endpoint = `http://localhost:1273/product/bySubCategoryid/${subCategoryId}`;

    // 3) Si no hay subCategoryId pero sí categoryId, usamos el endpoint de categoría
    } else if (categoryId) {
      endpoint = `http://localhost:1273/product/byCategoryid/${categoryId}`;

    // 4) Si no hay nada, pedimos todos
    } else {
      endpoint = `http://localhost:1273/product`;
    }

    const fetchProductos = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();

        // 5) Si estamos en modo “search”, filtramos localmente por product_name
        if (searchTerm.trim()) {
          const termLower = searchTerm.toLowerCase();
          const filtrados = data.filter((p) =>
            p.product_name.toLowerCase().includes(termLower)
          );
          setProducts(filtrados);

        // 6) Si no hay búsqueda, simplemente guardamos todo lo que venga
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener productos:", err);
      }
    };

    fetchProductos();
  }, [categoryId, subCategoryId, searchTerm, setProducts]);

  return (
    <Flex width="full" justify="center">
      <Box py={6} px={{ base: 4, md: 4 }}>
        <Flex justify="center">
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={6}
            justifyContent="center"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <Box
                  ml={{ md: "80px", base: "0px" }}
                  key={product.id}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    flex="0 0 250px"
                    maxW="300px"
                    h="400px"
                    display="flex"
                  >
                    <Box
                      flex="1"
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                      transform="scaleX(1.3) scaleY(1.0)"
                      transformOrigin="center center"
                    >
                      <LandingProductCard
                        image={
                          product.photo_url
                            ? product.photo_url
                            : "https://www.freundferreteria.com/Productos/GetImagenProductoPrincipal?idProducto=125ecabc-5319-4317-b455-0f5c1aa634d1&width=250&height=250&qa=75&ext=.jpg"
                        }
                        price={product.price}
                        name={product.product_name}
                        id={product.id_product}
                        discount={product.discount}
                        discountState={product.discount_state}
                      />
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Text color="white" fontSize={"3xl"}>
                No hay productos para mostrar
              </Text>
            )}
          </Grid>
        </Flex>
        {error && (
          <Text color="red.300" textAlign="center" mt={4}>
            {error}
          </Text>
        )}
      </Box>
    </Flex>
  );
}
