import React, { useState } from 'react';
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
  SimpleGrid
} from '@chakra-ui/react';

const MisPedidos = ({ token }) => {
  const [showHistorial, setShowHistorial] = useState(false);

  // Colores fijos
  const cardBg = 'gray.50';
  const borderColor = 'gray.900';
  const textColor = 'purple.600';
  const headerBg = 'gray.50';

  // Datos estáticos (a pedido de capi)
  const pedidosActivos = [
    {
      id: "PED-2024-001",
      fecha: "2024-05-28",
      estado: "En preparación",
      total: 3120000,
      items: [
        { nombre: "RAM Forgeon Cyclone PLUS", cantidad: 2, precio: 120000 },
        { nombre: "GeForce RTX 5060 Ti Twin Edge", cantidad: 1, precio: 3000000 }
      ]
    },
    {
      id: "PED-2024-002", 
      fecha: "2024-05-30",
      estado: "En camino",
      total: 189000,
      items: [
        { nombre: "Forgeon Captain RGB", cantidad: 1, precio: 89000 },
        { nombre: "Forgeon Clutch Teclado Gaming", cantidad: 1, precio: 50000 },
        { nombre: "Forgeon Darrowspike RGB Ratón Gaming", cantidad: 1, precio: 50000 }
      ]
    },
    {
      id: "PED-2024-003",
      fecha: "2024-06-01",
      estado: "Confirmado",
      total: 54000,
      items: [
        { nombre: "ASUS Spatha X Ratón Gaming", cantidad: 1, precio: 54000 },
      ]
    }
  ];

  const pedidosEntregados = [
    {
      id: "PED-2024-045",
      fecha: "2024-05-20",
      estado: "Entregado",
      total: 70650,
      rating: 5,
      items: [
        { nombre: "HyperX Earbuds II Auriculares Gaming", cantidad: 1, precio: 30150 },
        { nombre: "Logitech G502 Hero", cantidad: 1, precio: 40500 }
      ]
    },
    {
      id: "PED-2024-033",
      fecha: "2024-05-15",
      estado: "Entregado", 
      total: 460000,
      rating: 4,
      items: [
        { nombre: "Monitor Alurin CoreVision", cantidad: 2, precio: 230000 }
      ]
    },
    {
      id: "PED-2024-028",
      fecha: "2024-05-10",
      estado: "Entregado",
      total: 35600,
      rating: 5,
      items: [
        { nombre: "PcCom Essential Cable HDMI a VGA", cantidad: 4, precio: 8900 }
      ]
    },
  ];

  const getEstadoProps = (estado) => {
    const props = {
      "Confirmado": { colorScheme: "blue" },
      "En preparación": { colorScheme: "yellow" },
      "En camino": { colorScheme: "orange" },
      "Entregado": { colorScheme: "green" }
    };
    return props[estado] || { colorScheme: "blue" };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
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

  const PedidoCard = ({ pedido, showRating = false }) => (
    <Box 
      bg={cardBg} 
      shadow="md" 
      borderWidth="1px" 
      borderColor={borderColor}
      borderRadius="md"
      p={6}
    >
      {/* Header del pedido */}
      <Flex justify="space-between" align="flex-start" mb={4}>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="gray.800">
            {pedido.id}
          </Heading>
          <Text color={textColor} fontSize="sm">
            {formatDate(pedido.fecha)}
          </Text>
        </VStack>
        <VStack align="end" spacing={1}>
          <EstadoBadge estado={pedido.estado} />
          {showRating && <RatingStars rating={pedido.rating} />}
        </VStack>
      </Flex>

      {/* Línea divisoria */}
      <Box borderBottom="1px" borderColor={borderColor} mb={4} />

      {/* Items del pedido */}
      <VStack spacing={3} mb={4}>
        {pedido.items.map((item, index) => (
          <Flex key={index} w="100%" justify="space-between" align="center">
            <HStack>
              <Text fontWeight="medium" color="gray.700">
                {item.nombre}
              </Text>
              <Badge colorScheme="gray" size="sm" borderRadius="md">
                x{item.cantidad}
              </Badge>
            </HStack>
            <Text color={textColor} fontWeight="medium">
              {formatPrice(item.precio)}
            </Text>
          </Flex>
        ))}
      </VStack>

      {/* Línea divisoria */}
      <Box borderBottom="1px" borderColor={borderColor} mb={4} />

      {/* Total */}
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Total:
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="green.600">
          {formatPrice(pedido.total)}
        </Text>
      </Flex>
    </Box>
  );

  // Si no hay token, mostrar mensaje de login


  return (
    <Container maxW="container.xl" py={6}>
      {/* Header */}
      <VStack spacing={8} mb={8}>
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
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
                }}
                transition="all 5s ease"
                sx={{
                    textShadow: "0 0 10px rgba(168, 85, 247, 0.8)"
                }}
            >
                Mis Pedidos
            </Heading>
          <Text color="black" fontSize="lg">
            🌐 Seguí el estado de tus pedidos y consultá tu historial 🌐
          </Text>
        </Box>
      </VStack>

      {/* Pedidos Activos */}
      <VStack spacing={8} align="stretch">
        <Box>
          <HStack mb={4}>
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
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15), 0 16px 35px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                }}
                transition="all 0.2s ease"
                >
                Pedidos Activos
            </Heading>
          </HStack>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
            {pedidosActivos.map((pedido) => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))}
          </Grid>
        </Box>

              {/* Línea divisoria */}
      <Box borderBottom="1px" borderColor={borderColor} mb={88} />

        {/* Historial de Pedidos */}
        <Box>
        <HStack mb={4}>
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
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15), 0 16px 35px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
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
                  Historial de Entregas ({pedidosEntregados.length} pedidos)
                </Heading>
                <Text color={textColor} fontSize="sm">
                  Ver todos los pedidos entregados
                </Text>
              </VStack>
              <Text color="gray.400" fontSize="xl">
                {showHistorial ? '▲' : '▼'}
              </Text>
            </Button>
            
            {showHistorial && (
              <Box p={4} pt={0} borderTop="1px" borderColor={borderColor}  bg="gray.100">
                <VStack spacing={4}>
                  {pedidosEntregados.map((pedido) => (
                    <PedidoCard 
                      key={pedido.id} 
                      pedido={pedido} 
                      showRating={true}
                    />
                  ))}
                </VStack>
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
        >
          <Heading size="lg" mb={6} color="black.800">
            Resumen de Actividad
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            <Box textAlign="center">
              <Text fontSize="3xl" color="blue.500" fontWeight="bold">
                {pedidosActivos.length}
              </Text>
              <Text color={textColor} fontSize="sm">
                Pedidos Activos
              </Text>
            </Box>
            
            <Box textAlign="center">
              <Text fontSize="3xl" color="green.500" fontWeight="bold">
                {pedidosEntregados.length}
              </Text>
              <Text color={textColor} fontSize="sm">
                Pedidos Entregados
              </Text>
            </Box>
            
            <Box textAlign="center">
              <Text fontSize="3xl" color="purple.500" fontWeight="bold">
                $3.363.000
              </Text>
              <Text color={textColor} fontSize="sm">
                Total Gastado
              </Text>
            </Box>
            
            <Box textAlign="center">
              <Text fontSize="3xl" color="orange.500" fontWeight="bold">
                4.5
              </Text>
              <Text color={textColor} fontSize="sm">
                Rating Promedio
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default MisPedidos;