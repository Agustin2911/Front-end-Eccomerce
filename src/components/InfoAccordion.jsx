import { Accordion, Stack, Text, Box } from "@chakra-ui/react";

const items = [
  { value: "a", title: "First Item", text: "prueba" },
  { value: "b", title: "Second Item", text: "prueba" },
  { value: "c", title: "Third Item", text: "prueba" },
  { value: "1", title: "Third Item", text: "prueba" },
  { value: "c", title: "Third Item", text: "prueba" },
  { value: "c", title: "Third Item", text: "prueba" },
  { value: "c", title: "Third Item", text: "prueba" },
  { value: "2", title: "Third Item", text: "prueba" },
];

function InfoAccordion() {
  return (
    <Box
      width={{ base: "300px", md: "800px" }}
      mt={"50px"}
      mb={"150px"}
      bg={"white"}
      borderRadius={"20px"}
      borderColor={"#d3a5ee"}
      borderWidth={"3px"}
    >
      <Accordion.Root collapsible>
        {items.map((item, index) => (
          <Accordion.Item
            key={index}
            value={item.value}
            borderColor={"white"}
            border={"0px"}
          >
            <Accordion.ItemTrigger>
              <Stack gap="1">
                <Text ml={"20px"} color={"#ad5add"}>
                  {item.title}
                </Text>
                <Text fontSize="sm" color="blackAlpha.600" ml={"20px"}>
                  Click to expand
                </Text>
              </Stack>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody ml={"20px"} color={"blackAlpha.900"}>
                {item.text}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Box>
  );
}

export default InfoAccordion;
