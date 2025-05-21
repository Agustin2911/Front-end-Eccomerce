import { Box, Text, Input, Button, VStack, Select } from "@chakra-ui/react";
import { createListCollection, Portal } from "@chakra-ui/react";
import { For, Stack } from "@chakra-ui/react";

const frameworks = createListCollection({
  items: [
    { label: "menor a mayor", value: "1" },
    { label: "mayor a menor", value: "2" },
  ],
});

function Filters({ onApplyFilters }) {
  return (
    <Box
      p={6}
      height={"800px"}
      width={{ base: "350px", md: "600px" }}
      ml={{ base: "20px", md: "50px" }}
      bg={"white"}
      borderRadius={"20px"}
      mt={"25px"}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Filtros
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Precio mínimo */}
        <Stack gap="5" width={{ base: "300px", md: "400px" }}>
          <Select.Root key={"md"} size={"md"} collection={frameworks}>
            <Select.HiddenSelect />
            <Select.Label>Ordenar por:</Select.Label>
            <Select.Control>
              <Select.Trigger borderRadius={"15px"}>
                <Select.ValueText placeholder="Select framework" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content bg={"#d3a5ee"}>
                  {frameworks.items.map((framework) => (
                    <Select.Item
                      item={framework}
                      key={framework.value}
                      bg={"#d3a5ee"}
                      mb={3}
                    >
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Stack>

        <Box>
          <Text>Precio mínimo-Precio máximo</Text>
          <Box display={"flex"}>
            <Input
              mr={"10px"}
              type="number"
              placeholder="Ej: 100000"
              borderRadius={"15px"}
              onChange={(e) => onApplyFilters({ minPrice: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Ej: 500000"
              borderRadius={"15px"}
              onChange={(e) => onApplyFilters({ maxPrice: e.target.value })}
            />
          </Box>
        </Box>

        {/* Precio máximo */}

        {/* Botón aplicar (si lo preferís manual) */}
        <Button
          bg={"#d3a5ee"}
          width={{ base: "300px", md: "400px" }}
          borderRadius={"10px"}
          color={"#f1e6f7"}
          _hover={{ bg: "#ec1877" }}
          onClick={() => onApplyFilters()}
        >
          Aplicar filtros
        </Button>
      </VStack>
    </Box>
  );
}
export default Filters;
