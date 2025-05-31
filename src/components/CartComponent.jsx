import { Box, Text, Button, Stack, StackSeparator } from "@chakra-ui/react";
import Cardcart from "./CardCart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function deleter_cart(setCart) {
  setCart([]);
}

function CartComponent({ cart, setCart }) {
  let navigate = useNavigate();

  useEffect(() => {}, []);

  function delete_product(id_product, setSuccess) {
    return function (event) {
      let index_delete = cart.findIndex((e) => e.id_product === id_product);

      const updatedCart = [...cart];
      let carrito = updatedCart.filter(
        (producto, index) => index !== index_delete
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
      setTimeout(() => setCart(carrito), 1000);
    };
  }

  function check_card() {
    if (cart.length > 0) {
      navigate("/delivery");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#170d20", // Fondo principal
      }}
    >
      <Box
        width={{ base: "100%", md: "80%", lg: "100%" }}
        height={{ base: "100%", md: "100%" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Text
          mt={4}
          fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
          textAlign="center"
          color="#f1e6f7"
        >
          {cart.length > 0
            ? `El total de tu carrito es de: $${cart.reduce(
                (acc, item) => acc + item.price * item.amount,
                0
              )}`
            : "El carrito está vacío 🛒"}
        </Text>

        <Box
          borderWidth={"5px"}
          borderColor={"#D3A5EE"}
          shadow="2px 2px 2px 1px rgb(187, 141, 214)"
          height={{ base: "70%", md: "80%" }}
          my={6}
          width={{ base: "90%", md: "80%" }}
          borderRadius="lg"
          p={4}
          overflowY="auto"
          backgroundColor="white"
          display={cart.length > 0 ? "block" : "flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack separator={<StackSeparator />}>
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <Cardcart
                  key={index}
                  index={index}
                  id_product={product.id_product}
                  product_name={product.product_name}
                  amount={product.amount}
                  price={product.price}
                  url="  "
                  condition={product.condition}
                  delete_product={delete_product}
                  cart={cart}
                  setCart={setCart}
                />
              ))
            ) : (
              <Box
                display="flex"
                width="100%"
                height="100%"
                fontSize="3xl"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Text color="#170D20">El carrito está vacío..</Text>
              </Box>
            )}
          </Stack>
        </Box>

        <Box display="flex" flexDirection="row" gap={10}>
          <Button
            borderRadius="lg"
            width={{ base: "150px", md: "350px" }}
            onClick={check_card}
            bg="#EC1877"
            _hover={{ bg: "#9149bc" }}
            color="white"
          >
            Confirmar el carrito
          </Button>

          <Button
            borderRadius="lg"
            width={{ base: "150px", md: "350px" }}
            onClick={() => deleter_cart(setCart)}
            bg="#AE5BDD"
            _hover={{ bg: "#9149bc" }}
            color="white"
          >
            Vaciar el carrito
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default CartComponent;
