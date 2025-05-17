import { Box, Grid, Text, VStack, Image } from "@chakra-ui/react";

function CategorysButtons({ cat, i }) {
  return (
    <VStack
      key={i}
      bg="white"
      p={6} // padding más amplio
      boxSize={{ base: "160px", md: "250px" }} // antes era 300px/100px
      border="solid"
      borderWidth="0.2px"
      borderColor="gray.200"
      borderRadius="4px"
      _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={cat.icono}
        boxSize={{ base: "50px", md: "60px" }} // imagen más grande
        alt={cat.nombre}
      />
      <Text
        fontSize={{ base: "sm", md: "md" }}
        textAlign="center"
        color="gray.700"
      >
        {cat.nombre}
      </Text>
    </VStack>
  );
}

export default CategorysButtons;
