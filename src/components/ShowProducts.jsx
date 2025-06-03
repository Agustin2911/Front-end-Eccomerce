import React, { useEffect, useState } from "react";
import { Box, Grid, Flex, Text } from "@chakra-ui/react";
import LandingProductCard from "./LandingProductCard";
import { useParams } from "react-router-dom";

export default function ShowProducts({ products, setProducts }) {
  const { categoryId, subCategoryId } = useParams();

  const [error, setError] = useState(null);

  useEffect(() => {
    let endpoint = "";

    if (subCategoryId) {
      endpoint = `http://localhost:1273/product/bySubCategoryid/${subCategoryId}`;
    } else if (categoryId) {
      endpoint = `http://localhost:1273/product/byCategoryid/${categoryId}`;
    } else {
      return;
    }

    const fetchProductos = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener productos:", err);
      }
    };

    fetchProductos();
  }, [categoryId, subCategoryId]);

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
                  <Box flex="0 0 250px" maxW="300px" h="400px" display="flex">
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
                            ? "http://localhost:1273" + product.photo_url
                            : "https://www.freundferreteria.com/Productos/GetImagenProductoPrincipal?idProducto=125ecabc-5319-4317-b455-0f5c1aa634d1&width=250&height=250&qa=75&ext=.jpg"
                        }
                        price={product.price}
                        name={product.product_name}
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
      </Box>
    </Flex>
  );
}
