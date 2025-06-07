import { Box, Text } from "@chakra-ui/react";

export default function Description({ description }) {
  return (
    <Box
      bg="white"
      p={6}
      mt={-3}            // separa de la sección anterior
    >
      <Text fontSize="lg" fontWeight="semibold" mb={3}>
        Descripción
      </Text>
      <Text fontSize="md" color="gray.700" whiteSpace="pre-line">
        {description}
      </Text>
    </Box>
  );
}
