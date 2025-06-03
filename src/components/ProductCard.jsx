import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Box, Button, Text, Flex, Image } from "@chakra-ui/react";
const ProductCard = ({ image, name, price }) => {
  return (
    <Box
      className="border"
      height={"450px"}
      width={{ base: "100%", sm: "45%", md: "360px" }}
      justifyContent={"center"}
      borderRadius={"10px"}
      bg={"white"}
      p={4}
    >
      <Image
        src={image}
        alt={name}
        mt={{ base: 4, md: 6 }}
        mx="auto"
        boxSize={{ base: "120px", sm: "150px", md: "200px" }}
        objectFit="contain"
      />

      <Box mt={"2"}>
        <Text
          width="100%"
          ml={"6"}
          noOfLines={2}
          px={{ base: 2, md: 4 }}
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          textAlign="center"
          color={{ base: "black", md: "red" }}
        >
          {name}
        </Text>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontWeight="bold"
            color="pink.500"
            textAlign="center"
          >
            {price}
          </Text>
          <Button
            mt={"2"}
            bg={"#ae5bdd"}
            w="full"
            size={{ base: "sm", md: "md" }}
            borderRadius={"10px"}
            _hover={{ bg: "#d3a5ee" }}
            color={"#f1e6f7"}
          >
            comprar
          </Button>
          <Button
            mt={"2"}
            bg={"#d3a5ee"}
            w="full"
            size={{ base: "sm", md: "md" }}
            borderRadius={"10px"}
            _hover={{ bg: "#ec1877" }}
            color={"#f1e6f7"}
          >
            agregar al carrito
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
