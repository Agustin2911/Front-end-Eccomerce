import { Accordion, Stack, Text, Box } from "@chakra-ui/react";

const items = [
  {
    value: "1",
    title: "¿Quiénes somos?",
    text: "Somos una tienda online especializada en la venta de componentes de computadoras de alta calidad, tanto para usuarios entusiastas como para profesionales del rubro. Estamos ubicados en la Ciudad Autónoma de Buenos Aires (CABA) y trabajamos día a día para ofrecer los mejores productos, precios competitivos y atención personalizada.",
  },
  {
    value: "2",
    title: "¿Qué tipo de productos vendemos?",
    text: "En nuestra tienda vas a encontrar una amplia variedad de componentes: placas de video, procesadores, memorias RAM, motherboards, discos SSD/HDD, fuentes de alimentación, gabinetes, periféricos, sistemas de refrigeración y mucho más. También ofrecemos kits armados y configuraciones personalizadas para que puedas llevar tu PC al siguiente nivel.",
  },
  {
    value: "3",
    title: "¿Puedo vender mis productos en la tienda?",
    text: "¡Sí! Nuestra plataforma está abierta a marcas y vendedores de tecnología que quieran ofrecer sus productos a través de nuestro ecommerce. Si tenés una tienda, sos importador o fabricás accesorios tecnológicos, podés contactarnos para formar parte de nuestra red de vendedores y llegar a cientos de clientes potenciales.",
  },
  {
    value: "4",
    title: "¿Dónde están ubicados?",
    text: "Nuestra base de operaciones está en CABA, pero realizamos envíos a todo el país. También ofrecemos la opción de retiro en punto de entrega para quienes se encuentren cerca.",
  },
  {
    value: "5",
    title: "¿Por qué elegirnos?",
    text: "Nos apasiona la tecnología tanto como a vos. \n Elegirnos es confiar en un equipo que: \n Conoce el mercado y te asesora con conocimiento real. \n Solo trabaja con marcas reconocidas y productos originales.\n Ofrece una experiencia de compra simple, rápida y segura.\n Permite a otros vendedores sumarse, generando un ecosistema tech confiable y competitivo.",
  },
  {
    value: "6",
    title: "¿Qué beneficios tiene comprar en nuestra tienda?",
    text: "Soporte técnico y asesoramiento antes y después de tu compra.Envíos rápidos a todo el país. Múltiples medios de pago y financiación. Garantía oficial en todos los productos.",
  },
  {
    value: "7",
    title: "¿Ofrecen armado de PCs?",
    text: "Sí. Podés enviarnos una lista de componentes o elegir entre nuestros kits prearmados, y nos encargamos de ensamblar todo por vos. Además, te asesoramos según tus necesidades: gaming, diseño gráfico, edición de video, programación, etc.",
  },
  {
    value: "8",
    title: "¿Cómo puedo ponerme en contacto?",
    text: "Podés escribirnos a través de nuestro formulario de contacto en la web, por correo electrónico o por nuestras redes sociales. Siempre respondemos lo antes posible para darte la mejor atención.",
  },
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
                  ver respuesta
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
