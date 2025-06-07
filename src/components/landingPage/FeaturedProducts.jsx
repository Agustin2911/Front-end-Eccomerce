import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  IconButton,
  HStack,
  useToken,
  Icon,
  Text
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import LandingProductCard from "./LandingProductCard";
import BG_A from "../../assets/productShowcase.svg";

export default function FeaturedProducts({ productIds = [] }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const total = products.length;
  const visibleCount = 7;
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inset] = useToken("space", ["4"]);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!productIds || productIds.length === 0) {
        setError("No product IDs provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching products for IDs:", productIds);
        
        const requests = productIds.map((id) => {
          const url = `http://localhost:1273/product/productById/${id}`;
          console.log("Fetching:", url);
          return fetch(url);
        });

        const responses = await Promise.all(requests);
        
        // Check each response individually
        const data = await Promise.all(
          responses.map(async (res, index) => {
            if (!res.ok) {
              console.error(`Error fetching product ${productIds[index]}:`, res.status, res.statusText);
              throw new Error(`Error ${res.status}: ${res.statusText} for product ${productIds[index]}`);
            }
            const productData = await res.json();
            console.log(`Product ${productIds[index]} data:`, productData);
            return productData;
          })
        );

        const validProducts = data.filter(p => p && p.id_product);
        console.log("Valid products:", validProducts);
        setProducts(validProducts);
        
        if (validProducts.length === 0) {
          setError("No valid products found");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [productIds]);

  // Don't render carousel if no products
  if (loading) {
    return (
      <Box py={8} px={{ base: 4, md: 20 }}>
        <Heading
          mb={8}
          color="#F1E6F7"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          Productos Destacados
        </Heading>
        <Text color="#F1E6F7" textAlign="center">
          Cargando productos...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={8} px={{ base: 4, md: 20 }}>
        <Heading
          mb={8}
          color="#F1E6F7"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          Productos Destacados
        </Heading>
        <Text color="red.300" textAlign="center" mb={4}>
          Error al cargar productos: {error}
        </Text>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box py={8} px={{ base: 4, md: 20 }}>
        <Heading
          mb={8}
          color="#F1E6F7"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          Productos Destacados
        </Heading>
        <Text color="#F1E6F7" textAlign="center">
          No hay productos para mostrar
        </Text>
      </Box>
    );
  }

  const display = Array.from({ length: Math.min(visibleCount, products.length) }, (_, i) =>
    products[(startIdx + i) % total]
  );

  const handlePrev = () => {
    setDirection(-1);
    setStartIdx((i) => (i - 1 + total) % total);
  };
  
  const handleNext = () => {
    setDirection(1);
    setStartIdx((i) => (i + 1) % total);
  };

  return (
    <Box position="relative" py={8} px={{ base: 4, md: 20 }}>
      <Heading
        mb={8}
        color="#F1E6F7"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        textAlign="center"
      >
        Productos Destacados
      </Heading>

      <Box
        height="400px"
        overflow="hidden"
        position="relative"
        px={inset}
        bgImage={`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BG_A})`}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        borderRadius="lg"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={startIdx}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) handleNext();
              else if (info.offset.x > 50) handlePrev();
            }}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <HStack spacing={6} justify="center">
              {display.map((prod) => {
                console.log("Rendering product:", prod);
                return prod ? (
                  <Box key={prod.id_product} flex="0 0 250px" maxW="240px" h="400px" display="flex">
                    <Box
                      flex="1"
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                      transform="scale(0.9)"
                      transformOrigin="center center"
                    >
                      <LandingProductCard
                        image={prod.photo_url || 
                               "https://www.freundferreteria.com/Productos/GetImagenProductoPrincipal?idProducto=default"}
                        name={prod.product_name}
                        price={prod.price}
                        id={prod.id_product}
                        discount={prod.discount}
                        discountState={prod.discount_state}
                      />
                    </Box>
                  </Box>
                ) : null;
              })}
            </HStack>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Controls - only show if there are products */}
      {products.length > 1 && (
        <>
          <IconButton
            aria-label="Anterior"
            size="lg"
            borderRadius="full"
            bg="#F1E6F7"
            _hover={{ bg: "#F1E6F780" }}
            color="white"
            fontSize="24px"
            position="absolute"
            left={inset}
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrev}
            zIndex={2}
          >
            <FaAngleLeft color="#170D20" />
          </IconButton>

          <IconButton
            aria-label="Siguiente"
            icon={<Icon as={FaAngleRight} boxSize={6} color="white" />}
            size="lg"
            borderRadius="full"
            bg="#F1E6F7"
            _hover={{ bg: "#F1E6F780" }}
            color="white"
            fontSize="24px"
            position="absolute"
            right={inset}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNext}
            zIndex={2}
          >
            <FaAngleRight color="#170D20" />
          </IconButton>
        </>
      )}
    </Box>
  );
}
