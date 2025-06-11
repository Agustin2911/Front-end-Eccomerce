// src/pages/AdminPage.jsx

import React, { useState } from "react";
import MainNavbar from "@/components/allPages/MainNavbar";
import Footer from "@/components/allPages/Footer";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Spinner,
} from "@chakra-ui/react";

export default function AdminPage({ id_user, token, type }) {
  // — Estados para usuarios —
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // — Estados para sellers 
  const [sellers, setSellers] = useState([]);
  const [showSellers, setShowSellers] = useState(false);
  const [loadingSellers, setLoadingSellers] = useState(false);

  const handleToggleUsers = async () => {
    if (showUsers) {
      // si ya está visible, simplemente ocultamos
      setShowUsers(false);
      return;
    }
    setLoadingUsers(true);
    try {
      const resp = await fetch("http://localhost:1273/basic_user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      setUsers(data);
      setShowUsers(true);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      alert("No se pudieron cargar los usuarios. Revisa la consola.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleToggleSellers = async () => {
    if (showSellers) {
      setShowSellers(false);
      return;
    }
    setLoadingSellers(true);
    try {
      const resp = await fetch("http://localhost:1273/seller_user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      setSellers(data);
      setShowSellers(true);
    } catch (err) {
      console.error("Error al obtener sellers:", err);
      alert("No se pudieron cargar los vendedores. Revisa la consola.");
    } finally {
      setLoadingSellers(false);
    }
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      background="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      <MainNavbar type={type} id_user={id_user} />

      <Box flex="1" py={12} px={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 16 }}
          maxW="1200px"
          mx="auto"
        >
          {/* — Tarjeta 1: Usuarios registrados — */}
          <Box
            bg="#170D20"
            border="1px solid #AE5BDD"
            borderRadius="2xl"
            p={8}
            boxShadow="0 8px 20px rgba(139,92,246,0.4)"
          >
            <Heading size="lg" color="#AE5BDD" mb={4}>
              Usuarios registrados
            </Heading>
            <Text color="#F1E6F7" mb={6}>
              Aquí podrás ver el listado completo de usuarios.
            </Text>
            <Button
              color="#AE5BDD"
              variant="ghost"
              isLoading={loadingUsers}
              _hover={{ bg: "blackAlpha.500", color: "#EC1877" }}
              onClick={handleToggleUsers}
            >
              {showUsers ? "Ocultar usuarios" : "Ver usuarios"}
            </Button>

            {/* Contenedor del listado con margen superior */}
            {showUsers && (
              <Box mt={6}>
                {loadingUsers ? (
                  <Spinner color="purple.400" />
                ) : users.length > 0 ? (
                  <Stack spacing={3} maxH="300px" overflowY="auto">
                    {users.map((u) => (
                      <Box
                        key={u.id_user || u.id}
                        p={3}
                        bg="blackAlpha.300"
                        borderRadius="md"
                      >
                        <Text color="#F1E6F7">
                          {u.username}
                        </Text>
                        <Text color="whiteAlpha.600" fontSize="sm">
                          {u.mail}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Text color="whiteAlpha.600">No hay usuarios.</Text>
                )}
              </Box>
            )}
          </Box>

          {/* — Tarjeta 2: Vendedores pendientes — */}
          <Box
            bg="#170D20"
            border="1px solid #AE5BDD"
            borderRadius="2xl"
            p={8}
            boxShadow="0 8px 20px rgba(139,92,246,0.4)"
          >
            <Heading size="lg" color="#AE5BDD" mb={4}>
              Vendedores pendientes
            </Heading>
            <Text color="#F1E6F7" mb={6}>
              Revisa y aprueba las cuentas de vendedor pendientes de verificación.
            </Text>
            <Button
              color="#AE5BDD"
              variant="ghost"
              isLoading={loadingSellers}
              _hover={{ bg: "blackAlpha.500", color: "#EC1877" }}
              onClick={handleToggleSellers}
            >
              {showSellers ? "Ocultar pendientes" : "Ver pendientes"}
            </Button>

            {/* Contenedor del listado con margen superior */}
            {showSellers && (
              <Box mt={6}>
                {loadingSellers ? (
                  <Spinner color="purple.400" />
                ) : sellers.length > 0 ? (
                  <Stack spacing={3} maxH="300px" overflowY="auto">
                    {sellers.map((s) => (
                      <Box
                        key={s.id_user || s.id}
                        p={3}
                        bg="blackAlpha.300"
                        borderRadius="md"
                      >
                        <Text color="#F1E6F7">{s.company_name}</Text>
                        <Text color="whiteAlpha.600" fontSize="sm">
                          {s.cuit}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Text color="whiteAlpha.600">No hay vendedores.</Text>
                )}
              </Box>
            )}
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Flex>
  );
}
