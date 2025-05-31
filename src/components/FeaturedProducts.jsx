// src/components/FeaturedProducts.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  IconButton,
  HStack,
  useToken,
  Icon,
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import LandingProductCard from "./LandingProductCard";
import BG_A from "../assets/productShowcase.svg";

export default function FeaturedProducts({ products = [] }) {
  const total = products.length;
  const visibleCount = 7;
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inset] = useToken("space", ["4"]);

  const display = Array.from({ length: visibleCount }, (_, i) =>
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
    <Box position="relative" py={8} px={{ base: 4, md: 20 }} >
      <Heading
        mb={8}
        color="#F1E6F7"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        textAlign="center"
      >
        Productos Destacados
      </Heading>

      {/* Prev */}
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
        zIndex={2}><FaAngleLeft color="#170D20"/>
        </IconButton>

      <Box height="400px" overflow="hidden" position="relative" px={inset} bgImage={`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BG_A})`} bgPosition="center center, center center" backgroundPositionY="0px, 50%" bgSize="cover" bgRepeat="no-repeat" borderRadius="lg">
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
              {display.map((prod) => (
                <Box
                  key={prod.id}
                  flex="0 0 250px"
                  maxW="240px"
                  h="400px"
                  display="flex"
                >
                  <Box
                    flex="1"
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    transform="scale(0.9)"
                    transformOrigin="center center"
                  >
                    <LandingProductCard
                      image={prod.image}
                      name={prod.name}
                      price={prod.price}
                      oldPrice={prod.oldPrice}
                    />
                  </Box>
                </Box>
              ))}
            </HStack>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Next */}
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
      ><FaAngleRight color="#170D20" />
      </IconButton>
    </Box>
  );
}
