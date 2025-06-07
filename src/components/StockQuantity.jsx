import { Stack, HStack, Text, Icon, Input, Flex, StackSeparator, Box, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaCheckCircle  } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
export default function StockQuantity({stock, stockWarning }) {
    let stockLevel;

    if (stock <= stockWarning){
         stockLevel = "low"
    } else{
        stockLevel = "high"
    }

    return (
    <Box
      border="1.5px solid"
      borderColor= {stockLevel === "low" ? "yellow.400" : "green.400"}
      background={stockLevel === "low" ? "yellow.50" : "green.50"}
      px={2}
      w={{ base: "100%", sm: "auto" }}
      maxW={{ base: "97%", sm: "400px" }}
      mb="15px"
    >
        {stock != 0 ? (
     <Wrap align="center" spacing={2} /* aquí permitimos wrap automático */>
        <WrapItem flexShrink={0}>
          <Icon as={stockLevel === "low" ? TiWarning : FaCheckCircle} boxSize={10} color={stockLevel === "low" ? "yellow.400" : "green.400"} />
        </WrapItem>

        <WrapItem flex="1" minW={0} /* para que el texto pueda encoger y wrappear */>
          <VStack align="flex-start" spacing={0}>
            <Text
              fontWeight="bold"
              fontSize="md"
              lineHeight="2"
              color={stockLevel === "low" ? "yellow.600" : "green.600"}
              mt="5px"
              mb="-1px"
            >
              STOCK {stockLevel === "low" ? "BAJO" : "ALTO"}
            </Text>
            <Text
              fontSize="sm"
              color={stockLevel === "low" ? "yellow.500" : "green.500"}
              lineHeight="1.2"
              mt="0px"
            >
              Disponible para venta WEB y presencial
            </Text>
          </VStack>
        </WrapItem>
      </Wrap>
    ):(  
        <Text mt="15px"> Ha ocurrido un error de nuestra parte. Stock no disponible </Text>
    )}
    </Box>
  );
}

