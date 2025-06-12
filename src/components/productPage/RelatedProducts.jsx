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
import { FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export default function RelatedProducts({ products, id_product, id_category }) {
  
    const filtered = products.filter((prod) => prod.id_product !== id_product);
    const mostrar = filtered.slice(0, 4);


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
        const url = `/product-desc/${prod.id_product}`
        const priceFormatted = (prod.price).toLocaleString("es-AR");
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
            borderColor="#AE5BDD"
            variant="outline"
            _hover={{bg: "#422A52",color: "white", borderColor:"#422A52"}}
            >
            <FaShoppingCart/> Agregar
            </Button>
          </Box>
        )})}
      </SimpleGrid>
    </Box>
  );
}

