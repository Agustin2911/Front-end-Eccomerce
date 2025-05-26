// src/components/ProductReviews.jsx


import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
} from "@chakra-ui/react";
 import {
   FaStar,
   FaRegStar,
   FaStarHalfAlt,
   FaThumbsUp,
 } from "react-icons/fa";

 export default function ProductReviews({ reviews = [] }) {
   // helper: renderizar estrellas
   const renderStars = (rating) => {
     const stars = [];
     for (let i = 1; i <= 5; i++) {
       if (rating >= i) {
         stars.push(<Icon key={i} as={FaStar} color="yellow.400" />);
       } else if (rating > i - 1) {
         stars.push(<Icon key={i} as={FaStarHalfAlt} color="yellow.400" />);
       } else {
         stars.push(<Icon key={i} as={FaRegStar} color="yellow.400" />);
       }
     }
     return <HStack spacing={1}>{stars}</HStack>;
   };

   return (
     <Box mt={10} bg="white" p={6} borderTop="1px solid" borderColor="gray.200">
       {/* Título con número de comentarios */}
       <Text fontSize="lg" fontWeight="bold" mb={4}>
         {reviews.length} comentario{reviews.length !== 1 && "s"}
       </Text>

      <Box as="hr" borderColor="gray.200" borderWidth="1px" mb={6} />

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

