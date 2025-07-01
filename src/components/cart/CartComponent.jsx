import { Box, Text, Button, Stack, StackSeparator } from "@chakra-ui/react";
import Cardcart from "./CardCart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, setStockValidationLoading, setStockValidationResult } from "../../features/cart/cartSlice";
import { fetchProductStock } from "../../features/fetch/fetchProductStock";
import { toast } from "react-toastify";

function CartComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [stockData, setStockData] = useState({});

  // FUNCIÓN: Validar stock usando campos JSON correctos
  const validateCartStock = async () => {
    if (cart.items.length === 0) return true;

    dispatch(setStockValidationLoading(true));
    
    try {
      const stockPromises = cart.items.map(async (item) => {
        const result = await dispatch(fetchProductStock(item.id_product));
        return {
          productId: item.id_product,
          productName: item.product_name,
          requestedAmount: item.amount,
          availableStock: result.payload?.stock || 0, // CORRECTO: usar 'stock'
          stockData: result.payload,
        };
      });

      const stockResults = await Promise.all(stockPromises);
      
      // Actualizar stockData local para uso en CardCart
      const newStockData = {};
      stockResults.forEach(result => {
        newStockData[result.productId] = result.stockData;
      });
      setStockData(newStockData);

      // Verificar qué productos no tienen stock suficiente
      const invalidProducts = stockResults.filter(
        result => result.requestedAmount > result.availableStock
      );

      const isValid = invalidProducts.length === 0;

      dispatch(setStockValidationResult({
        isValid,
        invalidProducts: invalidProducts.map(p => ({
          id: p.productId,
          name: p.productName,
          requested: p.requestedAmount,
          available: p.availableStock,
        }))
      }));

      return isValid;
    } catch (error) {
      console.error("Error validating stock:", error);
      dispatch(setStockValidationResult({
        isValid: false,
        invalidProducts: [],
      }));
      return false;
    }
  };

  // Confirmar carrito con validación
  const check_card = async () => {
    if (cart.items.length === 0) return;

    const isStockValid = await validateCartStock();
    
    if (isStockValid) {
      navigate("/delivery");
    } else {
      // Mostrar toast con productos problemáticos
      const invalidProductNames = cart.stockValidation.invalidProducts
        .map(p => `${p.name} (solicitado: ${p.requested}, disponible: ${p.available})`)
        .join(", ");
      
      toast.error(
        `Stock insuficiente para: ${invalidProductNames}`, 
        {
          autoClose: 5000,
        }
      );
    }
  };

  // Cargar stock inicial cuando se monta el componente
  useEffect(() => {
    if (cart.items.length > 0) {
      validateCartStock();
    }
  }, [cart.items.length]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#170d20",
        paddingTop: "20px",
        paddingBottom: "20px",
        overflowY: "auto",
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
            ? `El total de tu carrito es de: ${cart.total.toLocaleString('es-AR', { 
                style: 'currency', 
                currency: 'ARS' 
              })}`
            : "El carrito está vacío 🛒"}
        </Text>
        {/* Alerta simple de stock insuficiente */}
        {!cart.stockValidation.isValid && cart.stockValidation.invalidProducts.length > 0 && (
          <Box
            bg="orange.100"
            border="1px solid"
            borderColor="orange.300"
            borderRadius="lg"
            p={4}
            mt={4}
            maxWidth="80%"
          >
            <Text fontWeight="bold" color="orange.800" mb={2}>
              ⚠️ Stock insuficiente:
            </Text>
            {cart.stockValidation.invalidProducts.map((product, index) => (
              <Text key={index} fontSize="sm" color="orange.700">
                • {product.name}: Solicitado {product.requested}, disponible {product.available}
              </Text>
            ))}
          </Box>
        )}

        <Box
          borderWidth="5px"
          borderColor="#D3A5EE"
          boxShadow="2px 2px 2px 1px rgb(187, 141, 214)"
          maxHeight="70vh"
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
                <Cardcart 
                  key={index} 
                  index={index} 
                  product={product}
                  stockData={stockData[product.id_product]}
                />
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
            bg={cart.stockValidation.isValid ? "#EC1877" : "gray.400"}
            _hover={{ bg: cart.stockValidation.isValid ? "#9149bc" : "gray.500" }}
            color="white"
            isLoading={cart.stockValidation.loading}
            loadingText="Validando stock..."
            isDisabled={!cart.stockValidation.isValid || cart.stockValidation.loading}
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
