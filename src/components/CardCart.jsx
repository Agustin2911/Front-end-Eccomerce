import { Box, Text, Image, Button, HStack, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Cardcart({
  url,
  id_product,
  product_name,
  price,
  amount,
  condition,
  delete_product,
  cart,
  setCart,
}) {
  const [amount_product, setAmountProduct] = useState(amount);
  const [total_price, setTotalPrice] = useState(amount * price);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setAmountProduct(amount);
    setTotalPrice(amount * price);
  }, [amount, price]);

  const handleIncrement = () => {
    const index = cart.findIndex((e) => e.id_product === id_product);
    if (index === -1) return;

    const updatedCart = [...cart];
    updatedCart[index].amount += 1;

    setCart(updatedCart);
    setAmountProduct((prev) => {
      const newAmount = prev + 1;
      setTotalPrice(newAmount * price);
      return newAmount;
    });
  };

  const handleDecrement = () => {
    const index = cart.findIndex((e) => e.id_product === id_product);
    if (index === -1) return;

    if (cart[index].amount <= 1) return;

    const updatedCart = [...cart];
    updatedCart[index].amount -= 1;

    setCart(updatedCart);
    setAmountProduct((prev) => {
      const newAmount = prev - 1;
      setTotalPrice(newAmount * price);
      return newAmount;
    });
  };

  const handleDelete = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    delete_product(id_product); // Ejecuta función recibida por props
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      h={{ base: "80", md: "40" }}
    >
      <HStack>
        <Image
          src={url}
          alt="Producto"
          borderRadius="md"
          width={"100px"}
          marginRight={"20px"}
        />
        <VStack align="start">
          <Text fontWeight="bold" width={"150px"} fontSize={"xl"}>
            {product_name.replace(/_/g, " ")}
            {condition === "used" ? " usado" : ""}
          </Text>
          <Text color="gray.600" fontSize={"lg"}>
            ${total_price}
          </Text>
        </VStack>
      </HStack>

      <HStack>
        {condition === "new" && (
          <HStack spacing={2} mt={4}>
            <Button
              size="sm"
              background="#d3a5ee"
              borderRadius="30px"
              width="60px"
              height="60px"
              onClick={handleDecrement}
            >
              -
            </Button>
            <Button disabled width="60px" height="60px">
              {amount_product}
            </Button>
            <Button
              size="sm"
              background="#d3a5ee"
              borderRadius="30px"
              width="60px"
              height="60px"
              onClick={handleIncrement}
            >
              +
            </Button>
          </HStack>
        )}
      </HStack>

      {/* Estilo personalizado del botón delete */}
      <Box
        as="button"
        onClick={delete_product(id_product, setSuccess)}
        position="relative"
        overflow="hidden"
        background={success ? "#27ae60" : "#c0392b"}
        color="white"
        borderRadius="md"
        width={{ base: "200px", md: "140px" }}
        height="60px"
        fontSize="md"
        textTransform="uppercase"
        fontWeight="bold"
        _hover={{
          opacity: 0.9,
        }}
        transition="all 0.3s ease"
        mt={5}
      >
        <Box
          position="absolute"
          top="0"
          left={success ? "-100%" : "0"}
          width="100%"
          height="100%"
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
          width="100%"
          height="100%"
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
