// src/components/BrandProductShowcase.jsx
import React from "react";
import { Box, Flex, SimpleGrid, useMediaQuery, Button } from "@chakra-ui/react";
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
  products = [],
  videoSrc,
  bgImage,
  videoLeft = true,
  exploreText = "Explora",
}) {
  // true when viewport is *at most* 1368px wide
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isSmallDesktop] = useMediaQuery("(max-width: 1368px)");

  // pick your card scale
  const cardScale = isSmallDesktop ? 0.80 : 0.85;
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
                    image={prod.image}
                    name={prod.name}
                    price={prod.price}
                    oldPrice={prod.oldPrice}
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