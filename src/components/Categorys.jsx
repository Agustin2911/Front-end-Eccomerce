// BuscarCategorias.jsx
import { Box, Grid, Text, VStack, Image, Flex, Center } from "@chakra-ui/react";
import CategorysButtons from "./CategorysButtons";

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
      <Box py={6} px={{ base: 4, md: 4 }}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          mb={6}
          display={"flex"}
          justifyContent={"center"}
        >
          ¿Qué estás buscando?
        </Text>
        <Flex justify="center">
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
            gap={0.4}
          >
            {categorias.map((cat, i) => (
              <CategorysButtons cat={cat} i={i}></CategorysButtons>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Categorys;
