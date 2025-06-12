import { Box, Center, Text } from "@chakra-ui/react";

export default function CategoryButton({ name, image, onClick }) {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      
      w="100%"
      h={{ base: "120px", md: "180px" }}
      bgImage={`url(${image})`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      borderRadius="8px"
      overflow="hidden"
      transition="transform 0.4s, box-shadow 0.4s ease,"
      _hover={{ transform: "scale(1.03)", boxShadow: "0 0 12px rgba(236,24,119,0.7)", }}
    >
      <Center h="100%">
        <Text
          color="#F1E6F7"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          textAlign="center"
          px={2}
        >
          {name}
        </Text>
      </Center>
    </Box>
  );
}