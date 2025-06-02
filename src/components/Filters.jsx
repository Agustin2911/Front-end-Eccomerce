"use client";

import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Stack,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";

// Opciones de orden
const orderOptions = createListCollection({
  items: [
    { label: "de menor a mayor", value: "asc" },
    { label: "de mayor a menor", value: "desc" },
  ],
});

function Filters({ onApplyFilters }) {
  const [order, setOrder] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <Box
      p={6}
      height={"800px"}
      width={{ base: "90%", md: "600px" }}
      m={"20px"}
      bg={"white"}
      borderRadius={"20px"}
      mt={"25px"}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Filtros
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Ordenar por */}
        <Stack gap={5} width={{ base: "250px", md: "400px" }}>
          <Text fontWeight="medium">Ordenar por:</Text>

          <Select.Root
            collection={orderOptions}
            selectedOption={order}
            onValueChange={({ value, label }) => setOrder({ value, label })}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger borderRadius="15px">
                <Select.ValueText placeholder="Selecciona un orden" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content bg="#d3a5ee">
                  {orderOptions.items.map((option) => (
                    <Select.Item
                      key={option.value}
                      item={option}
                      bg="#d3a5ee"
                      mb={3}
                    >
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Stack>

        {/* Precio mínimo y máximo */}
        <Box>
          <Text>Precio mínimo - Precio máximo</Text>
          <Box display="flex">
            <Input
              mr="10px"
              type="number"
              placeholder="Ej: 100000"
              borderRadius="15px"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Ej: 500000"
              borderRadius="15px"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Box>
        </Box>

        {/* Botón aplicar */}
        <Button
          bg="#d3a5ee"
          width={{ base: "250px", md: "400px" }}
          borderRadius="10px"
          color="#f1e6f7"
          _hover={{ bg: "#ec1877" }}
          onClick={() =>
            onApplyFilters({
              order: order?.value || "",
              minPrice,
              maxPrice,
            })
          }
        >
          Aplicar filtros
        </Button>
      </VStack>
    </Box>
  );
}

export default Filters;
