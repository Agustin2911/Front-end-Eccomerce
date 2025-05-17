import { Box, Text, Button, Stack, StackSeparator } from "@chakra-ui/react";
import Cardcart from "./CardCart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function deleter_cart(setCart) {
  localStorage.setItem("carrito", JSON.stringify([]));
  setCart([]); // Actualiza el estado para reflejar los cambios
}

function CartComponent() {
  const [cart, SetCarrito] = useState([]);
  localStorage.setItem("carrito", "[]");
  useEffect(() => {
    const carrito = localStorage.getItem("carrito");
    SetCarrito(carrito ? JSON.parse(carrito) : []);
    console.log(carrito);
  }, []);

  function delete_product(id_product) {
    return function (event) {
      let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      console.log(carrito);
      let index_delete = carrito.findIndex(
        (e) => Number(e.id_phone) === Number(id_product)
      );

      carrito = carrito.filter(
        (producto, index) => Number(index) !== index_delete
      );

      console.log("a");
      console.log(carrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      SetCarrito(carrito);
    };
  }

  function check_card() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    console.log(carrito);
    if (carrito.length > 0) {
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
        background: "#170d20",
        marginTop: "45px",
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
                (acc, item) => acc + item.precio * item.cantidad,
                0
              )}`
            : "El carrito está vacío 🛒"}
        </Text>

        <Box
          borderWidth={"2px"}
          boxShadow="0px 2px 10px #d3a5ee"
          height={{ base: "70%", md: "80%" }}
          my={6}
          width={{ base: "90%", md: "80%" }}
          borderRadius="20px"
          p={4}
          overflowY="auto"
        >
          <Stack separator={<StackSeparator />}>
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <Cardcart
                  key={index}
                  index={index}
                  id_product={product.id_phone}
                  product_name={product.name}
                  amount={product.cantidad}
                  price={product.precio}
                  url="  "
                  condition={product.condition}
                  delete_product={delete_product}
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
              ></Box>
            )}
          </Stack>
        </Box>

        <Box display="flex" flexDirection="row" gap={10}>
          <Button
            background="#ad5add"
            color="#f1e6f7"
            boxShadow="1px 4px 10px #ad5add"
            borderRadius="lg"
            width={{ base: "150px", md: "350px" }}
            onClick={check_card}
          >
            Confirmar el carrito
          </Button>

          <Button
            background="#ec1877"
            borderRadius="lg"
            color="#f1e6f7"
            boxShadow="1px 4px 10px #ec1877"
            width={{ base: "150px", md: "350px" }}
            onClick={() => deleter_cart(SetCarrito)}
          >
            Vaciar el carrito
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default CartComponent;
