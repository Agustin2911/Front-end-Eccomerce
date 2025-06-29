// src/components/RelatedProducts.jsx
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  Link,
  VStack,
} from "@chakra-ui/react";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function RelatedProducts({ products, id_product, id_category }) {
  const [addedItems, setAddedItems] = useState({}); // Estado para múltiples productos
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obtener información del usuario
  const user = useSelector(state => state.user);
  const isLoggedIn = user && user.token;
  
  const filtered = products.filter((prod) => prod.id_product !== id_product);
  const mostrar = filtered.slice(0, 4);

  // Función para verificar si puede realizar acciones de compra
  const canPurchase = () => {
    if (!isLoggedIn) return { canPurchase: false, reason: "login" };
    if (user.type !== 'buyer') return { canPurchase: false, reason: "userType" };
    return { canPurchase: true };
  };

  const handleAddToCart = (product) => {
    const { canPurchase: canPurchaseResult, reason } = canPurchase();
    
    if (!canPurchaseResult) {
      if (reason === "login") {
        navigate("/signup");
        return;
      }
      if (reason === "userType") {
        toast.error("Solo los usuarios compradores pueden hacer esto", {
          autoClose: 2500
        });
        return;
      }
    }

    // Si puede comprar, ejecutar la acción
    dispatch(addToCart({ item: product, extraFlag: false }));
    setAddedItems(prev => ({ ...prev, [product.id_product]: true }));
    
    // Resetear el estado después de 2 segundos
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id_product]: false }));
    }, 2000);
  };

  return (
    <Box mt={10}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Productos relacionados
      </Text>
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 4 }} 
        spacing={6} 
        alignItems="stretch" 
        gridAutoRows="1fr"
      >
        {mostrar.map((prod) => {
          const discounted = (prod.price - (prod.price * prod.discount / 100)).toLocaleString("es-AR");
          const url = `/product-desc/${prod.id_product}`;
          const priceFormatted = (prod.price).toLocaleString("es-AR");
          const isAdded = addedItems[prod.id_product];
          
          return (
            <Box
              key={prod.id_product}
              bg="white"
              p={4}
              textAlign="center"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Link as={RouterLink} to={url} _hover={{ textDecoration: "none" }}> 
                <Image
                  src={prod.photo_url}
                  alt={prod.product_name}
                  mx="auto"
                  mb={4}
                  maxH="150px"
                  objectFit="contain"
                  transition="transform 0.2s ease"
                  _hover={{ transform: "scale(1.2)" }}
                />
              </Link>
              <Link as={RouterLink} to={url} _hover={{ textDecoration: "none" }} color="black" style={{textDecoration: "none"}}>
                <Text fontSize="md" fontWeight="semibold" mb={2}>
                  {prod.product_name}
                </Text>
              </Link>
              <VStack align="center" spacing={0.5}>
                {prod.discount_state === "true" ? (
                  <>
                    <Text fontSize="lg" fontWeight="bold" color="#EC1877" lineHeight="0" mt="20px">
                      {discounted}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      textDecoration="line-through"
                      lineHeight="0"
                    >
                      {priceFormatted}
                    </Text>
                  </>
                ) : (
                  <Text fontSize="lg" fontWeight="bold" color="#EC1877" lineHeight="0" mt="20px">
                    {priceFormatted}
                  </Text>
                )}
              </VStack>
              <Button
                mt={4}
                width="100%"
                borderWidth="2px"
                borderColor={isAdded ? "green.500" : "#AE5BDD"}
                variant="outline"
                color={isAdded ? "white" : "inherit"}
                bg={isAdded ? "green.500" : "transparent"}
                transition="all 0.3s ease"
                _hover={{
                  bg: isAdded ? "green.600" : "#422A52",
                  color: "white", 
                  borderColor: isAdded ? "green.600" : "#422A52",
                  boxShadow: isAdded ? "0 0 8px 2px green" : "none",
                }}
                onClick={() => handleAddToCart(prod)}
              >
                {isAdded ? (
                  <>
                    <FaCheck /> Agregado
                  </>
                ) : (
                  <>
                    <FaShoppingCart /> Agregar
                  </>
                )}
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
