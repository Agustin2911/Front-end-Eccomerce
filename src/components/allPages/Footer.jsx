import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGooglePlusG,
} from "react-icons/fa";

import BG_A from "../../assets/Grafica.svg";

export default function Footer() {
  return (
    <Box as="footer" bgImage={`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${BG_A})`} 
                     bgPosition="center center, center center" 
                     backgroundPositionY="0px, 50%" 
                     bgSize="cover" 
                     bgRepeat="no-repeat"
                     borderTop="1px solid rgba(94, 84, 84, 0.8)"
                     py={6}
                     px={{ base: 6, md: 4 }}
                     justifyContent="center">        
      <Container  maxW="1180px">
  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} alignItems="start">

  {/* Dirección */}
  <Stack spacing={2} color="#f1e6f7" fontWeight="semibold">
    <Text>Lima 757</Text>
    <Text>Ciudad Autónoma de Buenos Aires</Text>
    <Text>Argentina</Text>
    <Text>Lunes a Viernes de 9 a 19</Text>
    <Text>Sábados de 10 a 15</Text>
    <Text opacity={0}>-</Text> {/* Espaciador invisible */}
  </Stack>

  {/* Partners */}
  <Stack spacing={2}  ml={{ base: "auto", md: 0 }}
  mr={{ base: "auto", md: 0 }}
  width="fit-content">
    <Text fontWeight="semibold" color="#f1e6f7">
      Partners
    </Text>
    {[
      { name: "AMD", url: "https://www.amd.com" },
      { name: "NVIDIA", url: "https://www.nvidia.com" },
      { name: "Intel", url: "https://www.intel.com" },
      { name: "Asus", url: "https://www.asus.com" },
      { name: "Gigabyte", url: "https://www.gigabyte.com" },
      { name: "Corsair", url: "https://www.corsair.com" },
    ].map((partner) => (
      <Link
        key={partner.name}
        href={partner.url}
        isExternal
        color="#d3a5ee"
        _hover={{ textDecoration: "none" }}
        textDecoration="none"
      >
        {partner.name}
      </Link>
    ))}
  </Stack>

  {/* Nosotros */}
  <Stack spacing={2}>
    <Link
      href="http://localhost:5173/"
      fontWeight="semibold"
      color="#d3a5ee"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
    >
      Gordo Compu Customs
    </Link>
    <Link
      href="https://www.whatsapp.com/"
      fontWeight="semibold"
      color="#d3a5ee"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
    >
      Contactanos
    </Link>
    <Link
      href="https://ar.indeed.com/"
      fontWeight="semibold"
      color="#d3a5ee"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
    >
      Unete a GC Customs
    </Link>
    <Link
      href="http://localhost:5173/us"
      fontWeight="semibold"
      color="#d3a5ee"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
    >
      Nosotros
    </Link>
    <Text opacity={0}>-</Text>
    <Text opacity={0}>-</Text>
    <Text opacity={0}>-</Text>
  </Stack>

  {/* GPTW logo (columna 4) permanece igual */}
  <Flex justify={{ base: "center", md: "flex-end" }} align="center"  order={{ base: 1, md: 2 }}>
    <Link href="https://www.greatplacetowork.com/" isExternal>
      <Box maxW={{ base: "100px", md: "180px", }}>
        <img
          src="https://www.greatplacetowork.com.ar/hs-fs/hubfs/certificacion_2025_color.png?width=1399&height=2000&name=certificacion_2025_color.png"
          alt="Great Place to Work"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Link>
  </Flex>
</SimpleGrid>


        {/* Bottom bar */}
        <Flex justify="center" align="center" mt={1} fontSize="sm" color="#f1e6f7" gap={6}>
          <Text mt={4}>© 2025 GC CUSTOMS GROUP</Text>
          <Link
            href="https://www.argentina.gob.ar/normativa/constituciones/nacional"
            ml={6}
            _hover={{ textDecoration: "none" }}
            textDecoration="none"
            color={"#ec1877"}
          >
            LEGACY POLICY
          </Link>
              <Link href="#" isExternal aria-label="Facebook">
            <Icon as={FaFacebook} boxSize={6}  ml={5} color="#ec1877" />
          </Link>
          <Link href="#" isExternal aria-label="Twitter">
            <Icon as={FaTwitter} boxSize={6} color="#ec1877" />
          </Link>
          <Link href="#" isExternal aria-label="LinkedIn">
            <Icon as={FaLinkedin} boxSize={6} color="#ec1877" />
          </Link>
          <Link href="#" isExternal aria-label="Google Plus">
            <Icon as={FaGooglePlusG} boxSize={6} color="#ec1877" />
          </Link>
              <Link href="https://www.facebook.com/" isExternal aria-label="Facebook">
            <Icon as={FaFacebook} boxSize={6}  ml={5} color="#ec1877" />
          </Link>
          <Link href="https://x.com/" isExternal aria-label="Twitter">
            <Icon as={FaTwitter} boxSize={6} color="#ec1877" />
          </Link>
          <Link href="https://www.linkedin.com/" isExternal aria-label="LinkedIn">
            <Icon as={FaLinkedin} boxSize={6} color="#ec1877" />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
