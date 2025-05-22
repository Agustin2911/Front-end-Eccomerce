import { Stack, HStack, Text, Icon, IconButton, Input, Flex, StackSeparator, Box, VStack } from "@chakra-ui/react";
import { FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";

export default function StockQuantity({ stockLevel }) {
  return (
    <Box
      border="1.5px solid"
      borderColor="green.400"
      background="green.50"
      p={2}
      maxW="400px"
      mb="15px"
    >
      <HStack align="center" spacing={1}>
        {/* Icono grande */}
        <Icon as={FaCheckCircle} boxSize={10} color="green.400" />

        {/* Ambos textos en vertical */}
        <VStack align="flex-start" spacing={0}>
          <Text fontWeight="bold" fontSize="md" lineHeight="1.2" mb="-2px" color="green.600" mt="5px">
            STOCK ALTO
          </Text>
          <Text fontSize="sm" color="green.500" lineHeight="1.2" mt="10px"  >
            Disponible para venta WEB y presencial
          </Text>
        </VStack>
      </HStack> 

    </Box>
  );
}

