import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
const ProductCard = ({ image, name, price }) => {
  return (
    <Box
      className="border"
      height={"450px"}
      width={"360px"}
      justifyContent={"center"}
      borderRadius={"10px"}
      bg={"white"}
    >
      <img
        src={image}
        alt={name}
        width={"200px"}
        style={{ marginLeft: "80px", marginTop: "20px" }}
      />

      <Box mt={"2"}>
        <Text width={300} ml={"6"}>
          {name}
        </Text>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <span>{price}</span>
          <Button
            mt={"2"}
            bg={"#ae5bdd"}
            width={300}
            borderRadius={"10px"}
            _hover={{ bg: "#d3a5ee" }}
            color={"#f1e6f7"}
          >
            comprar
          </Button>
          <Button
            mt={"2"}
            bg={"#d3a5ee"}
            width={300}
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
