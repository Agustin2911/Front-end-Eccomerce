// src/components/ProductReviews.jsx


import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
  Progress,
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
        acc[r.rating] = (acc[r.rating] || 0) + 1;
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
         stars.push(<Icon key={i} as={FaStar} color="#D3A5EE" />);
       } else if (rating > i - 1) {
         stars.push(<Icon key={i} as={FaStarHalfAlt} color="#D3A5EE" />);
       } else {
         stars.push(<Icon key={i} as={FaRegStar} color="#D3A5EE" />);
       }
     }
     return <HStack spacing={1}>{stars}</HStack>;
   };

   return (
     <Box mt={10} bg="white" p={6} borderTop="1px solid" borderColor="gray.200">
       

       {/* Título con número de comentarios */}
       <Text fontSize="lg" fontWeight="bold" mb={4}>
        Opiniones del producto
       </Text>

        <HStack align="center" spacing={3} mb={6}>
            {/* Número promedio */}
            <Text fontSize="3xl" fontWeight="bold">
                {average.toFixed(1)}
            </Text>
            {/* Iconos */}
           {renderStars(average)}
        </HStack>
        
        
         <VStack align="stretch" spacing={3} mb={6}>
      {distribution.map(({ star, pct }) => (
        <HStack key={star} align="center" spacing={2}>
          
          <Text w="40px" fontSize="sm" textAlign="right">
            {Math.round(pct * 100)}%
          </Text>

          <Progress.Root
            value={pct * 100}
            flex="1"
            size="sm"
            colorScheme="blue"
            borderRadius="md"
          >
            <Progress.Track>
                <Progress.Range />
          </Progress.Track>
            
          </Progress.Root>
          <HStack spacing={1}>
            <Text fontSize="sm">{star}</Text>
            <Icon as={FaStar} color="#D3A5EE" boxSize={4}/>
            </HStack>
          
        </HStack>
      ))}
    </VStack>

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

