// src/components/BrandProductShowcase.jsx
import { Box, Flex, SimpleGrid, useMediaQuery, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LandingProductCard from "./LandingProductCard";

/**
 * ProductShowcase
 * Renders a fixed 400px tall showcase section with:
 *  - A local video (videoSrc) on left or right
 *  - A background image (bgImage) behind a grid of up to 4 ProductCards
 * Props:
 *  - products: Array<{ id, image, name, price }>
 *  - videoSrc: string (path to local video asset)
 *  - bgImage: string (path to local background image)
 *  - videoLeft: boolean (true => video on left, false => video on right)
 */
export default function BrandProductShowcase({
  productIds = [],
  videoSrc,
  bgImage,
  videoLeft = true,
  exploreText = "Explora",
}) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isSmallDesktop] = useMediaQuery("(max-width: 1368px)");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const total = products.length;

  // pick your card scale
  const cardScale = isSmallDesktop ? 0.80 : 0.85;

  useEffect(() => {
      const fetchProductos = async () => {
        if (!productIds || productIds.length === 0) {
          setError("No product IDs provided");
          setLoading(false);
          return;
        }
  
        try {
          setLoading(true);
          setError(null);
          
          console.log("Fetching products for IDs:", productIds);
          
          const requests = productIds.map((id) => {
            const url = `http://localhost:1273/product/productById/${id}`;
            console.log("Fetching:", url);
            return fetch(url);
          });
  
          const responses = await Promise.all(requests);
          
          // Check each response individually
          const data = await Promise.all(
            responses.map(async (res, index) => {
              if (!res.ok) {
                console.error(`Error fetching product ${productIds[index]}:`, res.status, res.statusText);
                throw new Error(`Error ${res.status}: ${res.statusText} for product ${productIds[index]}`);
              }
              const productData = await res.json();
              console.log(`Product ${productIds[index]} data:`, productData);
              return productData;
            })
          );
  
          const validProducts = data.filter(p => p && p.id_product);
          console.log("Valid products:", validProducts);
          setProducts(validProducts);
          
          if (validProducts.length === 0) {
            setError("No valid products found");
          }
        } catch (err) {
          setError(err.message);
          console.error("Error al obtener productos:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProductos();
    }, [productIds]);
  return (
    <Box
      as="section"
      h={{ base: "auto", md: "500px" }}   // allow collapse on small screens
      w="100%"
      overflow="hidden"
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 8 }}
      bg="transparent"
    >
      <Flex
        h="100%"
        minH="0"
        flexDir={{ base: "column", md: "row" }}
      >
        {/* Video Panel */}
        {videoLeft && (
          <Box
            order={{ base: 0, md: 0 }}
            flex={{ base: "0 0 100%", md: "0 0 40%" }}
            h="100%"
            overflow="hidden"
            position="relative"
          >
            <Box
              as="video"
              src={videoSrc}
              autoPlay
              muted
              loop
              width="100%"
              height="100%"
              objectFit="cover"
            />
            {/* ←—— NEW BUTTON */}
            <Button
              position="absolute"
              bottom="4"
              transition="box-shadow 0.2s ease"
              left="50%"
              transform="translate(-50%, -50%)"
              borderWidth="2px"
              borderColor="#EC1877"
              variant="outline"
              color="#F1E6F7"
              _hover={{ bg: "#EC1877", color: "#F1E6F7", borderColor: "#F1E6F7", boxShadow: "0 0 8px 2px #F1E6F7", }}
            >
              {exploreText}
            </Button>
          </Box>
        )}

        {/* Products Panel with BG */}
        <Box
          order={{ base: 1, md: videoLeft ? 1 : 0 }}
          flex={{ base: "0 0 100%", md: "1" }}
          h="100%"
          minH="0"
          bgImage={`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage})`}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 4 }}
            spacing={6}
            h= "100%"      // auto height on small
            gridAutoRows="1fr"  
            justifyItems="center"
            alignItems="center"
          >
            {products.slice(0, 4).map((prod) => (
              <Box
                key={prod.id}
                w= "100%"
                maxW= "250px"
                h="100%"              // fill the grid cell
                display="flex"
                alignItems="stretch"
                justifyContent="center"
              >
                <Box
                  flex="1"
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  transform={`scale(${cardScale})`}
                  transformOrigin="center center"
                  w="100%"
                >
                  <LandingProductCard
                    image={prod.photo_url || 
                               "https://www.freundferreteria.com/Productos/GetImagenProductoPrincipal?idProducto=default"}
                    name={prod.product_name}
                    price={prod.price}
                    id={prod.id_product}
                    discount={prod.discount}
                    discountState={prod.discount_state}
                  />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Video Panel on Right */}
        {!videoLeft && (
          <Box
            order={{ base: 0, md: 2 }}
            flex={{ base: "0 0 100%", md: "0 0 40%" }}
            h="100%"
            overflow="hidden"
            position="relative"
          >
            <Box
              as="video"
              src={videoSrc}
              autoPlay
              muted
              loop
              width="100%"
              height="100%"
              objectFit="cover"
            />
             {/* ←—— NEW BUTTON */}
            <Button
              position="absolute"
              transition="box-shadow 0.2s ease"
              bottom="4"
              left="50%"
              transform="translate(-50%, -50%)"
              borderWidth="2px"
              borderColor="#EC1877"
              variant="outline"
              color="#F1E6F7"
              _hover={{ bg: "#EC1877", color: "#F1E6F7", borderColor: "#F1E6F7", boxShadow: "0 0 8px 2px #F1E6F7",}}
            >
              {exploreText}
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}