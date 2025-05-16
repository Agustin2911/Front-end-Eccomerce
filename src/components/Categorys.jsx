// BuscarCategorias.jsx
import { Box, Grid, Text, VStack, Image, Flex } from "@chakra-ui/react";

const categorias = [
  {
    nombre: "Discos Rígidos",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Placas de video",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Mouses",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Procesadores",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Auriculares",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Memorias RAM",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Monitores",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "SSD",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Motherboards",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
  {
    nombre: "Teclados",
    icono:
      "https://imgs.search.brave.com/dJTU8zAtczoo7ahtR_nqUhYRmkcfc_1rdJ0kpe3K6DY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xODQxMS8xODQx/MTUxNi5wbmc",
  },
];

function Categorys() {
  return (
    <Flex width="full" justify={"center"}>
      <Box w="full" py={6} px={{ base: 4, md: 4 }}>
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          ¿Qué estás buscando?
        </Text>
        <Flex justify="center">
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
            gap={0.4}
            w="full"
          >
            {categorias.map((cat, i) => (
              <VStack
                key={i}
                bg="white"
                p={4}
                boxSize={{ base: "200px", md: "100px" }}
                border={"solid"}
                borderWidth={"0.2px"}
                borderColor={"gray.200"}
                borderRadius={"2px"}
                _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
                cursor="pointer"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={cat.icono}
                  boxSize={{ base: "40px", md: "20px" }}
                  alt={cat.nombre}
                />
                <Text fontSize="sm" textAlign="center" color="gray.700">
                  {cat.nombre}
                </Text>
              </VStack>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Categorys;
