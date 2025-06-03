import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Badge,
  Button,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import MainNavbar from "./components/MainNavbar";

const MyOrders = () => {
  const { idUser } = useParams();
  const [showHistorial, setShowHistorial] = useState(false);
  const [delivered, setDelivered] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  const cardBg = "gray.50";
  const borderColor = "gray.900";
  const textColor = "purple.600";
  const headerBg = "gray.50";

  const calcularTotalGastado = () => {
    const sumarPedidos = (listaPedidos) =>
      listaPedidos.reduce((total, pedido) => {
        const subtotal = pedido.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        );
        return total + subtotal;
      }, 0);

    const totalEntregados = sumarPedidos(delivered);
    const totalEnProgreso = sumarPedidos(inProgress);

    return totalEntregados + totalEnProgreso;
  };

  const agruparYSepararPorEstado = (ordenes) => {
    const agrupadoPorPedido = {};

    // Agrupar por id_sale
    ordenes.forEach((orden) => {
      const id = orden.id_sale;
      if (!agrupadoPorPedido[id]) {
        agrupadoPorPedido[id] = [];
      }
      agrupadoPorPedido[id].push(orden);
    });

    const entregados = [];
    const enCaminoOPendiente = [];

    Object.values(agrupadoPorPedido).forEach((pedido) => {
      const todosEntregados = pedido.every(
        (item) => item.delivery_status.toLowerCase() === "entregado"
      );

      if (todosEntregados) {
        entregados.push(pedido); // Empujás todo el pedido
      } else {
        enCaminoOPendiente.push(pedido);
      }
    });
    console.log(enCaminoOPendiente);
    setDelivered(entregados);
    setInProgress(enCaminoOPendiente);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:1273/delivery-status/orders/${idUser}`
        );
        const data = await response.json();
        agruparYSepararPorEstado(data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrders();
  }, [idUser]);
  // Datos estáticos (a pedido de capi)

  const getEstadoProps = (estado) => {
    const props = {
      Confirmado: { colorScheme: "blue" },
      "En preparación": { colorScheme: "yellow" },
      "En camino": { colorScheme: "orange" },
      Entregado: { colorScheme: "green" },
    };
    return props[estado] || { colorScheme: "blue" };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const EstadoBadge = ({ estado }) => {
    const badgeProps = getEstadoProps(estado);
    return (
      <Badge {...badgeProps} px={3} py={1} borderRadius="full">
        {estado}
      </Badge>
    );
  };

  const RatingStars = ({ rating }) => {
    return (
      <HStack spacing={1} mt={2}>
        {[...Array(5)].map((_, i) => (
          <Text
            key={i}
            color={i < rating ? "yellow.400" : "gray.300"}
            fontSize="lg"
          >
            ★
          </Text>
        ))}
      </HStack>
    );
  };

  const PedidoCard = ({ pedido, showRating = false }) => {
    const cardBg = "gray.50";
    const borderColor = "gray.900";
    const textColor = "purple.600";

    // Extraemos info común
    const idSale = pedido[0]?.id_sale;
    const saleDate = pedido[0]?.sale_date;

    // Determinar estado general del pedido
    const estados = pedido.map((item) => item.delivery_status.toLowerCase());
    const estadoGeneral = estados.every((e) => e === "entregado")
      ? "entregado"
      : "pendiente";

    // Calcular total
    const total = pedido.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );

    return (
      <Box
        bg={cardBg}
        shadow="md"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={6}
        width={{ base: "360px", md: "600px" }}
        ml={3}
        height="100%"
      >
        <Flex direction="column" justify="space-between" height="100%">
          <Box>
            {/* Header del pedido */}
            <Flex justify="space-between" align="flex-start" mb={4}>
              <VStack align="start" spacing={1}>
                <Heading size="md" color="gray.800">
                  Pedido #{idSale}
                </Heading>
                <Text color={textColor} fontSize="sm">
                  {formatDate(saleDate)}
                </Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <EstadoBadge estado={estadoGeneral} />
              </VStack>
            </Flex>

            <Box borderBottom="1px" borderColor={borderColor} mb={4} />

            {/* Lista de productos */}
            {pedido.map((item, index) => (
              <Flex
                key={index}
                justify="space-between"
                align="center"
                mb={2}
                px={2}
              >
                <Text fontWeight="medium" color="gray.700">
                  {item.product_name} × {item.amount}
                </Text>
                <Text fontWeight="medium" color="gray.800">
                  {formatPrice(item.price * item.amount)}
                </Text>
              </Flex>
            ))}

            <Box borderBottom="1px" borderColor={borderColor} mt={4} mb={2} />
          </Box>

          {/* Total */}
          <Flex justify="space-between" align="center" mt={4}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Total:
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              {formatPrice(total)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  };

  // Si no hay token, mostrar mensaje de login

  return (
    <Box>
      <MainNavbar></MainNavbar>
      {/* Header */}
      <VStack spacing={8} m={8}>
        <Box textAlign="center">
          <Heading
            size="lg"
            px={6}
            py={3}
            borderRadius="lg"
            bg="gray.900"
            color="purple.300"
            border="2px solid"
            borderColor="purple.500"
            boxShadow="lg"
            animation="pulse 7s infinite"
            _hover={{
              animation: "none",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
            }}
            transition="all 5s ease"
            sx={{
              textShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
            }}
            w={{ md: "600px", base: "360px" }}
          >
            Mis Pedidos
          </Heading>
        </Box>
      </VStack>

      {/* Pedidos Activos */}
      <VStack spacing={8} align="stretch">
        <Box>
          <HStack
            mb={4}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize="2xl">📦</Text>
            <Heading
              size="lg"
              px={6}
              py={3}
              borderRadius="lg"
              bgGradient="linear(to-br, purple.500, purple.700)"
              color="purple.400"
              boxShadow="
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 8px 25px rgba(139, 92, 246, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2)
      "
              transform="scale(1)"
              _hover={{
                transform: "scale(1.05) translateY(-4px)",
                boxShadow:
                  "0 8px 12px rgba(0, 0, 0, 0.15), 0 16px 35px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
              transition="all 0.2s ease"
            >
              Pedidos Activos
            </Heading>
          </HStack>

          <Grid
            templateColumns={{
              base: "1fr", // 1 columna en móviles
              sm: "repeat(2, 1fr)", // 2 columnas en pantallas pequeñas
              md: "repeat(3, 1fr)", // máximo 3 columnas en pantallas medianas o grandes
            }}
            style={
              delivered.length === 0
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    marginTop: "50px",
                  }
                : {}
            }
            gap={3}
          >
            {inProgress.length > 0 ? (
              inProgress.map((pedido, index) => (
                <PedidoCard key={index} pedido={pedido} />
              ))
            ) : (
              <Text>no se hay pedidos pendientes</Text>
            )}
          </Grid>
        </Box>

        {/* Línea divisoria */}
        <Box borderBottom="1px" borderColor={borderColor} mb={88} />

        {/* Historial de Pedidos */}
        <Box>
          <HStack
            mb={4}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize="2xl">💸</Text>
            <Heading
              size="lg"
              px={6}
              py={3}
              borderRadius="lg"
              bgGradient="linear(to-br, purple.500, purple.700)"
              color="purple.400"
              boxShadow="
                0 4px 6px rgba(0, 0, 0, 0.1),
                0 8px 25px rgba(139, 92, 246, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
                "
              transform="scale(1)"
              _hover={{
                transform: "scale(1.05) translateY(-4px)",
                boxShadow:
                  "0 8px 12px rgba(0, 0, 0, 0.15), 0 16px 35px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
              transition="all 0.2s ease"
            >
              Pedidos Anteriores
            </Heading>
          </HStack>
          <Box
            bg={cardBg}
            shadow="md"
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="md"
            m={2}
          >
            <Button
              onClick={() => setShowHistorial(!showHistorial)}
              variant="ghost"
              w="100%"
              h="auto"
              p={4}
              justifyContent="space-between"
              borderRadius="md"
              _hover={{ bg: headerBg }}
            >
              <VStack align="start" spacing={1}>
                <Heading size="md" color="gray.800">
                  Historial de Entregas ({delivered.length} pedidos)
                </Heading>
                <Text color={textColor} fontSize="sm">
                  Ver todos los pedidos entregados
                </Text>
              </VStack>
              <Text color="gray.400" fontSize="xl">
                {showHistorial ? "▲" : "▼"}
              </Text>
            </Button>

            {showHistorial && (
              <Box borderColor={borderColor} bg="gray.100" mb={"100px"}>
                <Grid
                  templateColumns={{
                    base: "1fr", // 1 columna en pantallas chicas
                    sm: "repeat(2, 1fr)", // 2 columnas en pantallas medianas
                    lg: "repeat(3, 1fr)", // 3 columnas en pantallas grandes
                  }}
                  style={
                    delivered.length === 0
                      ? {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
                        }
                      : {}
                  }
                  gap={4}
                >
                  {delivered.length > 0 ? (
                    delivered.map((pedido, index) => (
                      <PedidoCard
                        key={index}
                        pedido={pedido}
                        showRating={true}
                      />
                    ))
                  ) : (
                    <Text>Todavia no se entrego ningun pedido</Text>
                  )}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>

        {/* Estadísticas */}
        <Box
          bg={headerBg}
          shadow="md"
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="md"
          p={6}
          m={2}
        >
          <Heading size="lg" mb={6} color="black.800">
            Resumen de Actividad
          </Heading>
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            spacing={6}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Box textAlign="center">
              <Text fontSize="3xl" color="blue.500" fontWeight="bold">
                {inProgress.length}
              </Text>
              <Text color={textColor} fontSize="sm">
                Pedidos Activos
              </Text>
            </Box>

            <Box textAlign="center">
              <Text fontSize="3xl" color="green.500" fontWeight="bold">
                {delivered.length}
              </Text>
              <Text color={textColor} fontSize="sm">
                Pedidos Entregados
              </Text>
            </Box>

            <Box textAlign="center">
              <Text fontSize="3xl" color="purple.500" fontWeight="bold">
                {formatPrice(calcularTotalGastado())}
              </Text>
              <Text color={textColor} fontSize="sm">
                Total Gastado
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default MyOrders;
