import { Box, Text, Image, Button, HStack, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Cardcart({
  index,
  url,
  id_product,
  product_name,
  price,
  amount,
  condition,
  delete_product,
}) {
  const [amount_product, SetAmount_product] = useState(amount);
  const [total_price, SetTotal_price] = useState(amount * price);

  useEffect(() => {
    SetAmount_product(amount);
    SetTotal_price(amount * price);
  }, [amount, price]); // Solo depende de  amount y  price

  const handleIncrement = () => {
    const id_product = Number(id_product);
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    let index = carrito.findIndex((e) => Number(e.id_phone) === id_product);

    if (index === -1) return;

    carrito[index].cantidad += 1;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el estado correctamente
    SetAmount_product((prevAmount) => {
      const newAmount = prevAmount + 1;
      SetTotal_price(newAmount * price);
      return newAmount;
    });
  };

  const handleDecrement = () => {
    const id_product = Number(id_product);
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    let index = carrito.findIndex((e) => Number(e.id_phone) === id_product);

    if (index === -1) return;

    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el estado correctamente
    SetAmount_product((prevAmount) => {
      const newAmount = prevAmount - 1;
      SetTotal_price(newAmount * price);
      return newAmount;
    });
  };

  return (
    <div key={index}>
      <Box
        p={4}
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        h={{ base: "40", md: "40" }}
      >
        <HStack display={"flex"}>
          <Image
            src={url} // Usar la URL pasada por props
            alt="Producto"
            borderRadius="md"
            width={"100px"}
            marginRight={"20px"}
          />
          <VStack align="start">
            <Text fontWeight="bold" width={"150px"} fontSize={"xl"}>
              {product_name.replace(/_/g, " ")}
              {condition === "used" ? " usado" : " "}
            </Text>
            <Text color="gray.600" fontSize={"lg"}>
              ${total_price}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          {condition === "new" ? (
            <div>
              <Button
                size="sm"
                colorPalette="blue"
                borderRadius={"30px"}
                width={"60px"}
                height={"60px"}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Button disabled width={"60px"} height={"60px"}>
                {amount_product}
              </Button>
              <Button
                size="sm"
                colorPalette="blue"
                borderRadius={"30px"}
                width={"60px"}
                height={"60px"}
                onClick={handleIncrement}
              >
                +
              </Button>
            </div>
          ) : (
            " "
          )}
        </HStack>
        <Button
          size="sm"
          colorPalette="red"
          borderRadius={"30px"}
          width={"60px"}
          height={"60px"}
          onClick={delete_product(id_product)}
        >
          X
        </Button>
      </Box>
    </div>
  );
}

export default Cardcart;
