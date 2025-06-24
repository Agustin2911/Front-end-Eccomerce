import React, { useEffect } from "react";
import { Box, Grid, Flex, Text } from "@chakra-ui/react";
import LandingProductCard from "../landingPage/LandingProductCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/fetch/productsSlice";

export default function ShowProducts() {
  const { categoryId, subCategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ categoryId, subCategoryId, searchTerm }));
  }, [categoryId, subCategoryId, searchTerm, dispatch]);

  return (
    <Flex width="full" justify="center">
      <Box py={6} px={{ base: 4, md: 4 }}>
        <Flex justify="center">
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={6}
            justifyContent="center"
          >
            {loading ? (
              <Text color="gray.300" fontSize={"xl"}>
                Cargando productos...
              </Text>
            ) : products.length > 0 ? (
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
