import { Stack, HStack, Text, Icon, Input, Flex, StackSeparator, Box, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function StockQuantity({ stockLevel }) {
  return (
    <Box
      border="1.5px solid"
      borderColor="green.400"
      background="green.50"
      px={2}
      w={{ base: "100%", sm: "auto" }}
      maxW={{ base: "100%", sm: "400px" }}
      mb="15px"
    >
     <Wrap align="center" spacing={2} /* aquí permitimos wrap automático */>
        <WrapItem flexShrink={0}>
          <Icon as={FaCheckCircle} boxSize={10} color="green.400" />
        </WrapItem>

        <WrapItem flex="1" minW={0} /* para que el texto pueda encoger y wrappear */>
          <VStack align="flex-start" spacing={0}>
            <Text
              fontWeight="bold"
              fontSize="md"
              lineHeight="1.2"
              color="green.600"
              mt="5px"
            >
              STOCK ALTO
            </Text>
            <Text
              fontSize="sm"
              color="green.500"
              lineHeight="1.2"
              mt="2px"
            >
              Disponible para venta WEB y presencial
            </Text>
          </VStack>
        </WrapItem>
      </Wrap>

    </Box>
  );
}

