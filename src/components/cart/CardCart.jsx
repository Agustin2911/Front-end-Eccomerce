import { Box, Text, Image, Button, HStack, VStack, Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  deleteProduct,
  incrementCartItem,
  decrementFromCart,
  updateCartItemQuantity,
} from "../../features/cart/cartSlice";
import { fetchProductStock } from "../../features/fetch/fetchProductStock";
import { useDispatch } from "react-redux";

function Cardcart({ product, index, stockData }) {
  console.log("cantidad" + product.amount);
  console.log("productoooooooooooooooooooooooooooooooooooo" + product.price);
  
  const [success, setSuccess] = useState(false);
  const [localStockData, setLocalStockData] = useState(stockData);
  const [stockLoading, setStockLoading] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(product.amount.toString());

  const dispatch = useDispatch();

  // Cargar stock del producto si no se pasó como prop
  useEffect(() => {
    if (!stockData) {
      const loadStock = async () => {
        setStockLoading(true);
        try {
          const result = await dispatch(fetchProductStock(product.id_product));
          if (result.payload) {
            setLocalStockData(result.payload);
          }
        } catch (error) {
          console.error("Error loading stock:", error);
        } finally {
          setStockLoading(false);
        }
      };
      loadStock();
    } else {
      setLocalStockData(stockData);
    }
  }, [dispatch, product.id_product, stockData]);

  // Actualizar input cuando cambia la cantidad del producto
  useEffect(() => {
    setInputQuantity(product.amount.toString());
  }, [product.amount]);

  // CORRECTO: Usar 'stock' del JSON
  const availableStock = localStockData?.stock || 999;
  const total_price = product.amount * product.price;
  const hasStockIssue = product.amount > availableStock;

  const handleDelete = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
    setTimeout(() => dispatch(deleteProduct(product.id_product)), 1500);
  };

  const handleIncrement = () => {
    dispatch(incrementCartItem({
      id: product.id_product,
      maxStock: availableStock
    }));
  };

  const handleDecrement = () => {
    dispatch(decrementFromCart(product.id_product));
  };

  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    setInputQuantity(value);
  };

  const handleQuantityInputBlur = () => {
    const quantity = parseInt(inputQuantity) || 1;
    dispatch(updateCartItemQuantity({
      id: product.id_product,
      quantity: quantity,
      maxStock: availableStock
    }));
  };

  const handleQuantityInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuantityInputBlur();
    }
  };

  return (
    <Box
      w="100%"
      p={4}
      my={2}
      bg="white"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      boxShadow="md"
      border={hasStockIssue ? "2px solid #E53E3E" : "1px solid #E2E8F0"}
    >
      {/* Alerta simple de stock insuficiente */}
      {hasStockIssue && (
        <Box
          bg="red.50"
          border="1px solid"
          borderColor="red.300"
          borderRadius="md"
          p={3}
          mb={3}
        >
          <Text fontSize="sm" color="red.700">
            ⚠️ Stock insuficiente. Disponible: {availableStock}, en carrito: {product.amount}
          </Text>
        </Box>
      )}

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Imagen + info */}
        <HStack spacing={4} align="center" w={{ base: "100%", md: "40%" }}>
          <Image
            src={product.photo_url}
            alt="Producto"
            borderRadius="md"
            width="100px"
            height="100px"
            objectFit="cover"
          />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="lg" noOfLines={2}>
              {product.product_name.replace(/_/g, " ")}
            </Text>
            <Text color="gray.600" fontSize="md">
              ${product.price.toLocaleString("es-AR")} c/u
            </Text>
            <Text fontWeight="bold" color="green.600" fontSize="lg">
              Total: ${total_price.toLocaleString("es-AR")}
            </Text>
            {localStockData && (
              <Text fontSize="xs" color={hasStockIssue ? "red.500" : "gray.500"}>
                {stockLoading ? "Cargando stock..." : `Stock disponible: ${availableStock}`}
              </Text>
            )}
          </VStack>
        </HStack>

        {/* Controles de cantidad */}
        <VStack spacing={2} mt={{ base: 4, md: 0 }}>
          <Text fontSize="sm" fontWeight="semibold">Cantidad</Text>
          <HStack spacing={2}>
            <Button
              size="sm"
              bg="#d3a5ee"
              borderRadius="30px"
              w="40px"
              h="40px"
              onClick={handleDecrement}
              _hover={{ bg: "#c294e0" }}
              isDisabled={product.amount <= 1}
            >
              -
            </Button>
            
            <Input
              value={inputQuantity}
              readOnly={true}
              cursor="default"
              onKeyDown={(e) => e.preventDefault()}
              onFocus={(e) => e.target.blur()}
              
              w="60px"
              h="40px"
              textAlign="center"
              borderRadius="md"
              type="number"
              min="1"
              max={availableStock}
              bg={hasStockIssue ? "red.50" : "white"}
              borderColor={hasStockIssue ? "red.300" : "gray.200"}
              css={{
                /* Chrome, Safari, Edge, Opera */
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                /* Firefox */
                '&[type=number]': {
                  '-moz-appearance': 'textfield',
                },
                /* Eliminar cursor de texto */
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'none',
                },
              }}
            />
            
            <Button
              size="sm"
              bg="#d3a5ee"
              borderRadius="30px"
              w="40px"
              h="40px"
              onClick={handleIncrement}
              _hover={{ bg: "#c294e0" }}
              isDisabled={product.amount >= availableStock || stockLoading}
              opacity={product.amount >= availableStock ? 0.5 : 1}
              cursor={product.amount >= availableStock ? "not-allowed" : "pointer"}
            >
              +
            </Button>
          </HStack>
          
          {/* Indicador visual de límite alcanzado */}
          {product.amount >= availableStock && (
            <Text fontSize="xs" color="orange.500" textAlign="center">
              Límite alcanzado
            </Text>
          )}
        </VStack>

        {/* Botón Eliminar */}
        <Box
          as="button"
          onClick={handleDelete}
          bg={success ? "#27ae60" : "#c0392b"}
          color="white"
          borderRadius="md"
          w={{ base: "100%", md: "120px" }}
          h="45px"
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
    </Box>
  );
}

export default Cardcart;
