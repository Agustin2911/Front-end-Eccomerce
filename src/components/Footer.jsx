import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Heading,
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

export default function Footer() {
  return (
    <Box as="footer" bg="#170d10" color="#f1e6f7" py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} alignItems="start">
          {/* Left column: address */}
          <Stack spacing={3}>
            <Text>137 rue d’Aguesseau</Text>
            <Text>92100 Boulogne-Billancourt</Text>
            <Text>France</Text>
          </Stack>

          {/* Solutions */}
          <Stack spacing={2} marginTop={{ base: "10px" }}>
            <Heading as="h4" size="md" mb={2}>
              Solutions
            </Heading>
            {[
              "Healthcare sector",
              "Insurance",
              "Digitization sector",
              "HR sector",
              "For any sectors",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                color={"#d3a5ee"}
                _hover={{ textDecoration: "underline" }}
                textDecoration={"none"}
              >
                {item}
              </Link>
            ))}
          </Stack>

          {/* Contact / Join */}
          <Stack spacing={2} marginTop={{ base: "10px" }}>
            <Link
              href="#"
              fontWeight="semibold"
              _hover={{ textDecoration: "none" }}
              textDecoration={"none"}
              color={"white"}
            >
              Contact us
            </Link>
            <Link
              href="#"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
              textDecoration={"none"}
              color={"#d3a5ee"}
            >
              Join us
            </Link>
          </Stack>

          {/* Social icons */}
          <Stack
            direction="row"
            spacing={4}
            justify={{ base: "flex-start", md: "flex-end" }}
            marginTop={{ base: "20px" }}
          >
            <Link href="#" isExternal aria-label="Facebook">
              <Icon as={FaFacebook} boxSize={6} color={"#ec1877"} />
            </Link>
            <Link href="#" isExternal aria-label="Twitter">
              <Icon as={FaTwitter} boxSize={6} color={"#ec1877"} />
            </Link>
            <Link href="#" isExternal aria-label="LinkedIn">
              <Icon as={FaLinkedin} boxSize={6} color={"#ec1877"} />
            </Link>
            <Link href="#" isExternal aria-label="Google Plus">
              <Icon as={FaGooglePlusG} boxSize={6} color={"#ec1877"} />
            </Link>
          </Stack>
        </SimpleGrid>

        {/* Bottom bar */}
        <Flex justify="center" align="center" mt={10} fontSize="sm">
          <Text mt={4}>© 2018 CEGEDIM GROUP</Text>
          <Link
            href="#"
            ml={6}
            _hover={{ textDecoration: "underline" }}
            color={"#ec1877"}
          >
            LEGACY POLICY
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
