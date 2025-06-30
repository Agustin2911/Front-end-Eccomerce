import { useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Stack,
  HStack,
  VStack,
  Button,
  IconButton,
  Flex,
  Wrap,
  Badge,
  Input,
  Icon,
} from "@chakra-ui/react";
import {
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaCheckCircle,
  FaTruck,
} from "react-icons/fa";
import StockQuantity from "./StockQuantity";
import Description from "./Description";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";
import { addToCart } from "../../features/cart/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { mode } from "@chakra-ui/theme-tools";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function ProductSection({
  images,
  reviews,
  related,
  name,
  description,
  price,
  stock,
  stockWarning,
  id,
  id_category,
  discount,
  discount_state,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  
  const [quantity, setQuantity] = useState(1);
  
  const dec = () => setQuantity((q) => Math.max(q - 1, 1));
  const inc = () => setQuantity((q) => q + 1);

  const isLoggedIn = user && user.token;

  const isDiscountActive = discount_state === "true";
  const discountedPrice = isDiscountActive
    ? price - (price * discount) / 100
    : price;

  const priceFormatted = price.toLocaleString("es-AR");
  const discountedPriceFormatted = discountedPrice.toLocaleString("es-AR");
  const cuotas = discountedPrice / 12;
  const cuotasFormatted = cuotas.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Función para verificar si puede realizar acciones de compra
  const canPurchase = () => {
    if (!isLoggedIn) return { canPurchase: false, reason: "login" };
    if (user.type !== 'buyer') return { canPurchase: false, reason: "userType" };
    return { canPurchase: true };
  };

  // Función para manejar las acciones de compra
  const handlePurchaseAction = (action) => {
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
    const productData = {
      id_product: id,
      product_name: name,
      amount: quantity,
      price: price,
      photo_url: images,
      description: description,
      discount: discount,
      discount_state: discount_state,
    };

    dispatch(addToCart({
      item: productData,
      extraFlag: action === "buyNow" ? false : true,
    }));

    if (action === "buyNow") {
      navigate("/cart");
    }
  };

  function handleAddToCart() {
    handlePurchaseAction("addToCart");
  }

  function handleBuyNow() {
    handlePurchaseAction("buyNow");
  }

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          sm: "1fr",
          md: "1fr, 1fr",
          lg: "2fr 1fr",
          xl: "3fr 2fr",
        }}
        gap={6}
        px={{ base: 4, lg: 6 }}
        py={6}
        overflowX="hidden"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Box borderBottom="1px solid" borderColor="gray.200" overflowX="auto">
          <Image
            src={images}
            alt="Imagen principal"
            w="full"
            maxH={{ md: "400px", xl: "900px" }}
            css={{
              "@media screen and (min-width: 520px) and (max-width: 767px)": {
                maxH: "400px",
              },
              "@media screen and (min-width: 1055px) and (max-width: 1279px)": {
                maxH: "900px",
              },
              "@media screen and (max-width: 360px)": {
                maxH: "250px",
              },
            }}
            mb={{ base: 2, md: 4 }}
            objectFit="contain"
            objectPosition={"left top"}
          />

          <Box
            overflowX="auto"
            w="full"
            mt={4}
            css={{
              "&::webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
          >
            <HStack spacing={2} minW="max-content">
              <Image
                src={images}
                boxSize={{
                  base: "90px",
                  sm: "100px",
                  md: "100px",
                  lg: "130px",
                }}
                objectFit="cover"
                borderRadius="md"
                cursor="pointer"
                flexShrink={0}
              />
            </HStack>
          </Box>

          <Text fontSize="xs" color="gray.500" mt={2}>
            * Las imágenes son meramente ilustrativas y no son contractuales.
          </Text>
        </Box>

        <Box
          borderLeft={{ base: "none", lg: "1px solid", xl: "1px solid" }}
          borderBottom="1px solid"
          borderColor={{ base: "gray.200", lg: "gray.200", xl: "gray.200" }}
          pl={{ base: 0, lg: 6 }}
        >
          <VStack align="stretch" spacing={{ base: "3", md: "4" }}>
            <Text fontSize="sm" color="gray.500"></Text>
            <Heading fontSize={{ base: "lg", md: "2xl" }} mt="-3">
              {name}
            </Heading>

            <Stack spacing={0}>
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
                12 cuotas sin interés de:{" "}
                <Text as="span" color="#EC1877" fontWeight="bold">
                  {cuotasFormatted}
                </Text>
              </Text>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.500"
                mt="-20px"
              >
                ** Sobre el precio de lista
              </Text>
            </Stack>

            <Stack spacing={0}>
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
                Precio especial:{" "}
                {isDiscountActive ? (
                  <>
                    <Text
                      as="span"
                      color="gray.500"
                      textDecoration="line-through"
                      mr={2}
                    >
                      ${priceFormatted}
                    </Text>
                    <Text as="span" color="green.500" fontWeight="bold">
                      ${discountedPriceFormatted}
                    </Text>
                  </>
                ) : (
                  <Text as="span" color="green.500" fontWeight="bold">
                    ${priceFormatted}
                  </Text>
                )}
              </Text>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.500"
                mt="-20px"
                whiteSpace="normal"
                wordBreak="break-word"
              >
                ** Abonando con débito, transferencia o efectivo en el local
              </Text>
            </Stack>

            <StockQuantity stock={stock} stockWarning={stockWarning} />

            <Box w="100%" h="1px" bg="gray.300" mt="-5px" mb="10px" />

            <Flex align="center" gap={{ base: 2, md: 4 }} justify="center">
              <IconButton
                aria-label="Disminuir cantidad"
                colorPalette="#AE5BDD"
                variant="unstyled"
                color="#AE5BDD"
                onClick={dec}
                _hover={{ color: "#422A52" }}
              >
                <FaMinus />
              </IconButton>
              <Input value={quantity} readOnly w="60px" textAlign="center" />
              <IconButton
                aria-label="Aumentar cantidad"
                color="#AE5BDD"
                variant="unstyled"
                onClick={inc}
                _hover={{ color: "#422A52" }}
              >
                <FaPlus />
              </IconButton>
            </Flex>

            {/* BOTÓN COMPRAR AHORA ACTUALIZADO */}
            <Button
              bg="#AE5BDD"
              size={{ base: "sm", md: "lg" }}
              w="100%"
              _hover={{ bg: "#422A52" }}
              py={{ base: 2, md: 3 }}
              css={{
                "@media screen and (max-width: 321px)": {
                  w: "98%",
                },
              }}
              onClick={handleBuyNow}
            >
              Comprar ahora
            </Button>

            <HStack spacing={4} w="100%">
              {/* BOTÓN AGREGAR AL CARRITO ACTUALIZADO */}
              <Button
                borderWidth="2px"
                borderColor="#AE5BDD"
                variant="outline"
                flex="1"
                _hover={{
                  bg: "#422A52",
                  color: "white",
                  borderColor: "#422A52",
                }}
                fontSize={{ base: "sm", md: "sm" }}
                css={{
                  "@media screen and (max-width: 321px)": {
                    maxW: "47%",
                    fontSize: "xs",
                  },
                }}
                onClick={handleAddToCart}
              >
                <FaShoppingCart /> Agregar
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <Description description={description} />
      <RelatedProducts
        products={related}
        id_product={id}
        id_category={id_category}
      />
      <ProductReviews reviews={reviews} productId={id} />
      
      {/* ToastContainer para mostrar las notificaciones */}
      <ToastContainer 
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
