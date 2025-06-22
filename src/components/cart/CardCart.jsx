import { Box, Text, Image, Button, HStack, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  deleteProduct,
  addToCart,
  decrementFromCart,
} from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function Cardcart({ product }) {
  console.log("cantidad" + product.amount);

  console.log("productoooooooooooooooooooooooooooooooooooo" + product.price);
  const [amount_product, setAmountProduct] = useState(product.amount);
  const [total_price, setTotalPrice] = useState(product.amount * product.price);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setAmountProduct(product.amount);
    setTotalPrice(product.amount * product.price);
  }, [product.amount, product.price]);

  const handleDelete = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
    setTimeout(() => dispatch(deleteProduct(product.id_product)), 1500);
  };

  return (
    <Box
      w="100%"
      p={4}
      my={2}
      bg="white"
      borderRadius="md"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
    >
      {/* Imagen + info */}
      <HStack spacing={4} align="center" w={{ base: "100%", md: "40%" }}>
        <Image
          src={product.photo_url}
          alt="Producto"
          borderRadius="md"
          width="100px"
        />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold" fontSize="lg">
            {product.product_name.replace(/_/g, " ")}
          </Text>
          <Text color="gray.600">${total_price}</Text>
        </VStack>
      </HStack>

      {/* Controles de cantidad */}
      <HStack spacing={2} mt={{ base: 4, md: 0 }}>
        <Button
          size="sm"
          bg="#d3a5ee"
          borderRadius="30px"
          w="50px"
          h="50px"
          onClick={() => dispatch(decrementFromCart(product.id_product))}
        >
          -
        </Button>
        <Button
          disabled
          w="50px"
          h="50px"
          background={"blue"}
          borderRadius={"50px"}
        >
          {amount_product}
        </Button>
        <Button
          size="sm"
          bg="#d3a5ee"
          borderRadius="30px"
          w="50px"
          h="50px"
          onClick={() =>
            dispatch(addToCart({ item: product, extraFlag: false }))
          }
        >
          +
        </Button>
      </HStack>

      {/* Botón Eliminar */}
      <Box
        as="button"
        onClick={handleDelete}
        bg={success ? "#27ae60" : "#c0392b"}
        color="white"
        borderRadius="md"
        w={{ base: "100%", md: "140px" }}
        h="50px"
        fontSize="sm"
        fontWeight="bold"
        mt={{ base: 4, md: 0 }}
        ml={{ md: 4 }}
        transition="all 0.3s ease"
        _hover={{ opacity: 0.9 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left={success ? "-100%" : "0"}
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.3s ease"
        >
          <Text>Eliminar</Text>
        </Box>
        <Box
          position="absolute"
          top="0"
          right={success ? "0" : "-100%"}
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.3s ease"
        >
          <FontAwesomeIcon icon={success ? faCheck : faTrash} size="lg" />
        </Box>
      </Box>
    </Box>
  );
}

export default Cardcart;
