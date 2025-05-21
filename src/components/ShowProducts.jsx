import React from "react";
import ProductCard from "./ProductCard";
import { Box, Grid, Flex } from "@chakra-ui/react";
export default function ShowProducts() {
  const products = [
    {
      id: 1,
      name: "WEBCAM LOGITECH BRIO 300 GRAPHITE FHD 960-001413",
      price: "$99.181,98",
      image:
        "https://th.bing.com/th/id/OIP.VKn1m2qRasK3g9UWy0i6UgHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 2,
      name: "TECLADO MECANICO DUCKY ONE 3 MINI RGB HOTSWAP CHERRY MX RED",
      price: "$172.740,01",

      image:
        "https://th.bing.com/th/id/OIP.VKn1m2qRasK3g9UWy0i6UgHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 3,
      name: "MOUSE LOGITECH G PRO SUPERLIGHT 2 LIGHTSPEED MAGENTA 910-006796",
      price: "$161.550,39",
      image:
        "https://th.bing.com/th/id/OIP.VKn1m2qRasK3g9UWy0i6UgHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 3,
      name: "MOUSE LOGITECH G PRO SUPERLIGHT 2 LIGHTSPEED MAGENTA 910-006796",
      price: "$161.550,39",
      image:
        "https://th.bing.com/th/id/OIP.VKn1m2qRasK3g9UWy0i6UgHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 3,
      name: "MOUSE LOGITECH G PRO SUPERLIGHT 2 LIGHTSPEED MAGENTA 910-006796",
      price: "$161.550,39",
      image:
        "https://th.bing.com/th/id/OIP.VKn1m2qRasK3g9UWy0i6UgHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 3,
      name: "MOUSE LOGITECH G PRO SUPERLIGHT 2 LIGHTSPEED MAGENTA 910-006796",
      price: "$161.550,39",
      image:
        "https://th.bing.com/th/id/OIP.VKn1m2qRasK3g9UWy0i6UgHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
    },

    // Agrega más productos si querés
  ];

  return (
    <Flex width="full" justify={"center"}>
      <Box py={6} px={{ base: 4, md: 4 }}>
        <Flex justify="center">
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={3}
          >
            {products.map((product) => (
              <ProductCard
                image={product.image}
                price={product.price}
                name={product.name}
              ></ProductCard>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}
