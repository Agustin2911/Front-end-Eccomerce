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
import { applyFilters, clearPriceFilters } from "@/features/fetch/allProductsSlice";
import { useDispatch } from "react-redux";

// Opciones de orden
const orderOptions = createListCollection({
  items: [
    { label: "De menor a mayor", value: "asc" },
    { label: "De mayor a menor", value: "desc" },
  ],
});

function Filters() {
  const [order, setOrder] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();

  const onApplyFilters = ({ order, minPrice, maxPrice }) => {
    dispatch(applyFilters({ order, minPrice, maxPrice }));
  };

  // NUEVA FUNCIÓN - Para limpiar filtros
  const onClearFilters = () => {
    setOrder(null);
    setMinPrice("");
    setMaxPrice("");
    dispatch(clearPriceFilters());
  };

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
            value={order ? [order.value] : []}
            onValueChange={(details) => {
              const selectedValue = details.value[0];
              if (selectedValue) {
                const selectedOption = orderOptions.items.find(item => item.value === selectedValue);
                setOrder(selectedOption);
              } else {
                setOrder(null);
              }
            }}
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

        {/* Botón aplicar filtros - CORREGIDO */}
        <Button
          bg="#d3a5ee"
          width={{ base: "250px", md: "400px" }}
          borderRadius="10px"
          color="white"
          _hover={{ bg: "#ec1877" }}
          onClick={() =>
            onApplyFilters({
              order: order?.value || null, // CAMBIO AQUÍ: null en lugar de ""
              minPrice,
              maxPrice,
            })
          }
        >
          Aplicar filtros
        </Button>

        {/* NUEVO BOTÓN - Limpiar filtros */}
        <Button
          bg="gray.400"
          width={{ base: "250px", md: "400px" }}
          borderRadius="10px"
          color="white"
          _hover={{ bg: "gray.500" }}
          onClick={onClearFilters}
        >
          Limpiar filtros
        </Button>
      </VStack>
    </Box>
  );
}

export default Filters;
