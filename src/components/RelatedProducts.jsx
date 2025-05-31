// src/components/RelatedProducts.jsx
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function RelatedProducts({ products }) {
  return (
    <Box mt={10}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Productos relacionados
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
        {products.map((prod) => (
          <Box
            key={prod.id}
            bg="white"
            p={4}
            textAlign="center"
            
          >
            <Link href={prod.url} _hover={{ textDecoration: "none" }}> 
                <Image
                src={prod.image}
                alt={prod.name}
                mx="auto"
                mb={4}
                maxH="150px"
                objectFit="contain"
            transition="transform 0.2s ease"
            _hover={{ transform: "scale(1.2)" }}
                />
            </Link>
            <Text fontSize="md" fontWeight="semibold" mb={2}>
              {prod.name}
            </Text>
            <HStack justify="center" spacing={2} mb={4}>
              <Text fontSize="lg" fontWeight="bold" color="#EC1877">
                {prod.price}
              </Text>
              {prod.oldPrice && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  textDecoration="line-through"
                >
                  {prod.oldPrice}
                </Text>
              )}
            </HStack>
            <Button
            borderWidth="2px"
            borderColor="#AE5BDD"
            variant="outline"
            flex="1"
            _hover={{bg: "#422A52",color: "white", borderColor:"#422A52"}}
            >
            <FaShoppingCart/> Agregar
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

