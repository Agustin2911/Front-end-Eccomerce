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

export default function RelatedProducts({ products }) {
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
        {products.map((prod) => (
          <Box
            key={prod.id}
            bg="white"
            p={4}
            textAlign="center"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
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
            <Link href={prod.url} _hover={{ textDecoration: "none" }} color="black" style={{textDecoration: "none"}}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>
              {prod.name}
            </Text>
            </Link>
            <VStack align="center" spacing={0.5}>
              <Text fontSize="lg" fontWeight="bold" color="#EC1877" lineHeight="0" mt="20px">
                {prod.price}
              </Text>
              {prod.oldPrice && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  textDecoration="line-through"
                  lineHeight="0"
                >
                  {prod.oldPrice}
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
        ))}
      </SimpleGrid>
    </Box>
  );
}

