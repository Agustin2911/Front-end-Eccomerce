// src/pages/PublishPage.jsx

import React, { useState, useRef, useEffect } from "react";
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

import { MdPublish } from "react-icons/md";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createShop, resetCreateShop } from "../features/fetch/fetchCreateShop";

export default function PublishPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.token || user.type !== "seller") {
      navigate("/signup", { replace: true });
    }
  }, [user.token, user.type, navigate]);

  const [ciudad, setCiudad] = useState("");
  const [street, setStreet] = useState("");
  const [isHoveringDisabled, setIsHoveringDisabled] = useState(false);

  const ciudadInvalid = ciudad.trim().length === 0;
  const streetInvalid = street.trim().length === 0;
  const isButtonDisabled = ciudadInvalid || streetInvalid;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
const { loading, error, success, shop } = useSelector(state => state.createShop);

  function handleRegister() {
    dispatch(createShop({ city: ciudad, street }));
  }

  useEffect(() => {
    if (success) {
      alert("¡Tienda creada con éxito!");
      dispatch(resetCreateShop());
      navigate("/publish")  
    }
  }, [success, dispatch, navigate]);

  return (
    <Flex
      direction="column"
      minH="100vh"
      background="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      <MainNavbar />

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
                placeholder="Ingresa la ciudad"
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
                placeholder="Ingresa la direccion"
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
      <Flex justify="center" mt={4}>
        <Button
          variant="plain"
          color="#ad5add"
          _hover={{ color: "#EC1877" }}
          mb="6"
          onClick={() => navigate(`/publish`)}
        >
          <MdPublish />
          Publicar un producto
        </Button>
      </Flex>
      {/**
       * El Footer queda aquí, al final del Flex,
       * pero gracias a que el Box anterior tiene flex="1",
       * siempre se empuja al bottom de la pantalla
       **/}
      <Footer />
    </Flex>
  );
}
