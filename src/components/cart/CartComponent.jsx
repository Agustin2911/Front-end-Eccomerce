import { Box, Text, Button, Stack, StackSeparator } from "@chakra-ui/react";
import Cardcart from "./CardCart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
function CartComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  function check_card() {
    if (cart.items.length > 0) {
      navigate("/delivery");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 👈 IMPORTANTE
        backgroundColor: "#170d20",
        paddingTop: "20px", // 👈 espacio desde arriba para que no quede pegado
        paddingBottom: "20px", // 👈 espacio para botones abajo
        overflowY: "auto", // 👈 permite scroll en pantallas chicas
      }}
    >
      <Box
        width={{ base: "100%", md: "80%", lg: "100%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
      >
        <Text
          mt={4}
          fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
          textAlign="center"
          color="#f1e6f7"
        >
          {cart.items.length > 0
            ? `El total de tu carrito es de: $${cart.total}`
            : "El carrito está vacío 🛒"}
        </Text>

        <Box
          borderWidth="5px"
          borderColor="#D3A5EE"
          boxShadow="2px 2px 2px 1px rgb(187, 141, 214)"
          maxHeight="70vh" // 👈 límite razonable para scroll interno
          my={6}
          width={{ base: "90%", md: "80%" }}
          borderRadius="lg"
          p={4}
          overflowY="auto"
          backgroundColor="white"
        >
          <Stack spacing={4} separator={<StackSeparator />}>
            {cart.items.length > 0 ? (
              cart.items.map((product, index) => (
                <Cardcart key={index} index={index} product={product} />
              ))
            ) : (
              <Box
                display="flex"
                width="100%"
                height="800px"
                fontSize="3xl"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Text color="#170D20">El carrito está vacío..</Text>
              </Box>
            )}

            {cart.items.length <= 2 && cart.items.length > 0 ? (
              <Box
                display="flex"
                width="100%"
                height="400px"
                fontSize="3xl"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              ></Box>
            ) : (
              ""
            )}
          </Stack>
        </Box>

        <Box display="flex" flexDirection="row" gap={10} flexWrap="wrap">
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
            onClick={() => dispatch(clearCart())}
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
