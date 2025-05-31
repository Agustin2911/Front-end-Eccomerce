// src/components/LandingProductCard.jsx

import React from "react";
import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

/**
 * ProductCard
 * Displays a single product with image, name, price, and action button.
 * Props:
 *  - image: string URL of product image
 *  - name: string product name
 *  - price: string current price
 *  - oldPrice?: string optional old price to strike-through
 */
export default function LandingProductCard({ image, name, price, oldPrice }) {
  return (
    <Box
      position="relative"
      borderRadius="lg"
      bg="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(8px)"
      border="1px solid rgba(94, 84, 84, 0.2)"  // subtle outline
      transition="box-shadow 0.2s ease"
      _hover={{
      boxShadow: "0 0 8px 2px #EC1877" // pink glow
      }}
      p={0}
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      {/* OFERTA badge */}
      {oldPrice && (
        <Box
          position="absolute"
          top="2"
          left="2"
          bg="#EC1877"
          color="#F1E6F7"
          fontSize="xs"
          fontWeight="bold"
          px="2"
          py="1"
          zIndex="1"
        >
          OFERTA
        </Box>
      )}
      <Box bg="white" py={3} px={0} borderTopLeftRadius="lg" borderTopRightRadius="lg">
      <Image
        src={image}
        alt={name}
        mx="auto"
        mb={2}
        maxH="120px"
        objectFit="contain"
        transition="transform 0.2s ease"
        _hover={{ transform: "scale(1.1)" }}
      />
      </Box>
      <Box p={3} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
        <Box flex="1" overflow="hidden" mb={2}>
          <Text fontSize="clamp(0.75rem, 2vw, 1rem)" fontWeight="semibold" mb={2} noOfLines={4} lineHeight="1" color="#F1E6F7">
            {name}
          </Text>
        </Box>
      </Box>

      <Box mb={2} textAlign="center">
        <Text fontSize="md" fontWeight="bold" color="#F1E6F7" lineHeight="1">
          {price}
        </Text>
        {oldPrice && (
          <Text
            fontSize="xs"
            color="gray.500"
            textDecoration="line-through"
            lineHeight="0"
          >
            {oldPrice}
          </Text>
        )}
      </Box>
      
      <Box px={2} py={2}>
      <Button
        py={2}
        px={4}
        fontSize="sm" 
        transition="box-shadow 0.2s ease"
        width="100%"
        borderWidth="2px"
        borderColor="#EC1877"
        variant="outline"
        color="#F1E6F7"
        _hover={{ bg: "#EC1877", color: "#F1E6F7", borderColor: "#EC1877", boxShadow: "0 0 8px 2px #EC1877",}}
      >
        <FaShoppingCart /> Agregar
      </Button>
      </Box>
    </Box>
  );
}
