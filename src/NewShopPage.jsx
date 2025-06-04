// src/pages/PublishPage.jsx

import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";

import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";

export default function PublishPage({ cart, id_user }) {

  const [ciudad, setCiudad] = useState("");
  const [street, setStreet] = useState("");
  const [isHoveringDisabled, setIsHoveringDisabled] = useState(false);

  const ciudadInvalid = ciudad.trim().length === 0;
  const streetInvalid = street.trim().length === 0;
  const isButtonDisabled = ciudadInvalid || streetInvalid;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    // Si el botón está deshabilitado, no hacemos nada
    if (isButtonDisabled) return;

    setIsSubmitting(true);

    try {
      const payload = {
        id_user: id_user,
        city: ciudad.trim(),
        street: street.trim(),
      };

      const response = await fetch("http://localhost:1273/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // si el backend devuelve algún error HTTP
        const errorText = await response.text();
        console.error("Error al registrar la tienda:", errorText);
        alert("Ocurrió un error al crear la tienda. Revisa la consola para más detalles.");
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      console.log("Tienda creada con éxito:", data);

      // Aquí puedes hacer lo que consideres: redirigir, limpiar el formulario, mostrar mensaje, etc.
      alert("¡La tienda se creó con éxito!");
      setCiudad("");
      setStreet("");
    } catch (error) {
      console.error("Error en fetch:", error);
      alert("Hubo un problema de conexión al intentar crear la tienda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      background="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      <MainNavbar cart={cart} />

      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        {/* Contenedor blanco principal */}
        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          maxW="1000px"
          w="100%"
          mb={8}
          mt={8}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }} 
                  >
          <Heading as="h1" size="lg" mb={6} textAlign="center" color="#AE5BDD">
            Registra tu tienda 
          </Heading>

          {/*
            Dividimos el formulario en 2 columnas:
            - Columna izquierda: Nombre, Descripción, Precio
            - Columna derecha: Stock actual, Stock mínimo, Foto, Categoría, Subcategoría, Botón
          */}
          <Flex>
            {/* ----------------------------
                Columna IZQUIERDA (w="50%")
            ---------------------------- */}
            <Box w="100%" pr={6}>
              {/* 1) Nombre del producto */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && ciudadInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Ciudad donde esta ubicada:
              </Text>
              <Input
                color="white"
                placeholder="Ingresa el nombre"
                _placeholder={{ color: "whiteAlpha.600" }}
                value={ciudad}
                mb={4}
                borderColor={
                  isHoveringDisabled && ciudadInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setCiudad(e.target.value);
                  }
                }}
              />
              <Text
                fontSize="xs"
                color={ciudad.length > 100 ? "#EC1877" : "whiteAlpha.600"}
                mb={4}
                textAlign="right"
              >
                {ciudad.length}/100
              </Text>
                

              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && streetInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Direccion donde esta ubicada: 
              </Text>
              <Input
                color="white"
                placeholder="Ingresa el nombre"
                _placeholder={{ color: "whiteAlpha.600" }}
                value={street}
                mb={4}
                borderColor={
                  isHoveringDisabled && streetInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setStreet(e.target.value);
                  }
                }}
              />
              <Text
                fontSize="xs"
                color={street.length > 100 ? "#EC1877" : "whiteAlpha.600"}
                mb={4}
                textAlign="right"
              >
                {street.length}/100
              </Text>

              <Box
                onMouseEnter={() => {
                  if (isButtonDisabled) setIsHoveringDisabled(true);
               }}
                onMouseLeave={() => {
                  if (isButtonDisabled) setIsHoveringDisabled(false);
                }}
              >
                <Button
                  bgColor={isButtonDisabled ? "#D3A5EE" : "#AE5BDD"}
                  w="100%"
                  disabled={isButtonDisabled}
                  onClick={handleRegister}
                >
                  {isSubmitting ? "Registrando..." : "Registrar tienda"}
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/**
         * El Footer queda aquí, al final del Flex,
         * pero gracias a que el Box anterior tiene flex="1",
         * siempre se empuja al bottom de la pantalla
       **/}
      <Footer />
    </Flex>
  );
}


