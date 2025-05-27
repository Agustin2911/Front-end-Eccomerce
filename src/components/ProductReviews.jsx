// src/components/ProductReviews.jsx


import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
  Progress,
  Stack,
} from "@chakra-ui/react";
 import {
   FaStar,
   FaRegStar,
   FaStarHalfAlt,
   FaThumbsUp,
 } from "react-icons/fa";

 export default function ProductReviews({ reviews = [] }) {
    // 1) total de reseñas
  const total = reviews.length;
  // 2) promedio
  const average =
    total > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;
    
    // 2.1) contar cuántas calificaciones hay de cada nivel
    const counts = reviews.reduce((acc, r) => {
        const star = Math.ceil(r.rating);
        acc[star] = (acc[star] || 0) + 1;
        return acc;
    }, {});

// 2.2) generar un array [5,4,3,2,1] con su porcentaje
    const distribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        pct: total > 0 ? (counts[star] || 0) / total : 0,
    }));

   // helper: renderizar estrellas
   const renderStars = (rating) => {
     const stars = [];
     for (let i = 1; i <= 5; i++) {
       if (rating >= i) {
         stars.push(<Icon key={i} as={FaStar} color="#D3A5EE" mt="-2px"/>);
       } else if (rating > i - 1) {
         stars.push(<Icon key={i} as={FaStarHalfAlt} color="#D3A5EE" mt="-2px"/>);
       } else {
         stars.push(<Icon key={i} as={FaRegStar} color="#D3A5EE" mt="-2px"/>);
       }
     }
     return <HStack spacing={1}>{stars}</HStack>;
   };

   return (
     <Box mt={10} bg="white" p={6} borderTop="1px solid" borderColor="gray.200">
        <Stack
        align="flex-start"
        spacing={4}
        maxW="400px"
        mb={6}
      >

       {/* Título con número de comentarios */}
       <Text fontSize="lg" fontWeight="bold" mb={1}>
        Opiniones del producto
       </Text>

       <HStack align="baseline" spacing={1} mb="-15px">
            <Text fontSize="5xl" fontWeight="bold" color="#D3A5EE">
                {average.toFixed(1)}
            </Text>
            {renderStars(average)}
            <Text fontSize="sm" color="gray.500">
                {total} calificaciones
            </Text>
        </HStack>

      <VStack align="stretch" spacing={3} mb={6} w="full" mt="-6px">
            {distribution.map(({ star, pct }) => (
        <Progress.Root
          key={star}
          value={pct * 100}
          size="sm"
          thickness="6px"
          colorScheme="blackAlpha"
          borderRadius="md"
          variant={"subtle"}
        >
          <HStack spacing={2} align="center">
            {/* 1) El porcentaje a la izquierda */}
            <Progress.ValueText minW="40px">
              {Math.round(pct * 100)}%
            </Progress.ValueText>

            {/* 2) La barra ocupa todo el espacio disponible */}
            <Progress.Track flex="1">
              <Progress.Range />
            </Progress.Track>

            {/* 3) A la derecha, el “label” con número + estrella */}
            <Progress.Label>
              <HStack spacing={1}>
                <Progress.ValueText>{star} </Progress.ValueText>
                <Icon as={FaStar} color="#D3A5EE" ></Icon>
              </HStack>
            </Progress.Label>
          </HStack>
        </Progress.Root>
        ))}
       </VStack>
       </Stack>

       {/* Listado de reviews */}
       <VStack align="stretch" spacing={6}>
         {reviews.map((r, i) => (
           <Box key={i}>
             <HStack justify="space-between">
               {renderStars(r.rating)}
               <Text fontSize="sm" color="gray.500">
                 {r.date}
               </Text>
             </HStack>
             <Text mt={2} color="gray.700">
               {r.text}
             </Text>
             <Button
               size="sm"
               variant="ghost" 
               colorScheme="gray"
               mt={2}
             >
                <FaThumbsUp /> Es útil {r.helpful}
             </Button>
           </Box>
         ))}
       </VStack>
     </Box>
   );
 }

