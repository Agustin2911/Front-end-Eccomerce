// src/components/ShowProducts.jsx

import React, { useEffect, useState } from "react";
import { Box, Grid, Flex, Text } from "@chakra-ui/react";
import LandingProductCard from "../landingPage/LandingProductCard";
import { useParams, useSearchParams } from "react-router-dom";

export default function ShowProducts({ products, setProducts }) {
  const { categoryId, subCategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [error, setError] = useState(null);

  useEffect(() => {
    let endpoint = "";

    if (searchTerm.trim()) {
      endpoint = `http://localhost:1273/product`;
    } else if (subCategoryId) {
      endpoint = `http://localhost:1273/product/bySubCategoryid/${subCategoryId}`;
    } else if (categoryId) {
      endpoint = `http://localhost:1273/product/byCategoryid/${categoryId}`;
    } else {
      endpoint = `http://localhost:1273/product`;
    }

    const fetchProductos = async () => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Borra productos anteriores si hay error
          setProducts([]);
        }

        const data = await response.json();

        if (searchTerm.trim()) {
          const termLower = searchTerm.toLowerCase();
          const filtrados = data.filter((p) =>
            p.product_name.toLowerCase().includes(termLower)
          );
          setProducts(filtrados); // ya sean 0 o más
        } else {
          setProducts(data); // ya sean 0 o más
        }

        setError(null); // limpia errores previos si todo sale bien
      } catch (err) {
        setProducts([]); // borra productos anteriores
        setError(err.message); // muestra error
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
                  <Box flex="0 0 250px" maxW="300px" h="400px" display="flex">
                    <Box
                      flex="1"
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                      transform="scaleX(1.3) scaleY(1.0)"
                      transformOrigin="center center"
                    >
                      <LandingProductCard product={product} />
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
