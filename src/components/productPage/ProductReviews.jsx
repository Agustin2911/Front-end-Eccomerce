// src/components/ProductReviews.jsx
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
  Progress,
  Stack,
} from "@chakra-ui/react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,   
  FaThumbsUp,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import { useSelector, useDispatch } from 'react-redux';
import { postReview, resetCreateReview } from '@/features/fetch/fetchCreateReview';
import { fetchReviews } from "@/features/fetch/fetchReviews";
import { canPostReview, resetCanPostReview } from '@/features/fetch/fetchCanPostReview';
import { checkAlreadyReviewed, resetAlreadyReviewed } from '@/features/fetch/fetchAlreadyReviewed';

export default function ProductReviews({ reviews, productId }) {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.createReview);
  const { canPost, loading: checkingPermission, error: permissionError } = useSelector(state => state.canPostReview);
  const { hasReviewed, loading: checkingReviewed } = useSelector(state => state.alreadyReviewed);

  const user = useSelector(state => state.user);
  const isLoggedIn = user && user.token;

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  // Verificar permisos cuando el componente se monta o cambia el productId
  useEffect(() => {
    if (productId && isLoggedIn) {
      dispatch(canPostReview(productId));
      // Solo verificar si ya hizo review si es buyer
      if (user?.type === 'buyer') {
        dispatch(checkAlreadyReviewed(productId));
      }
    }
  }, [dispatch, productId, isLoggedIn, user?.type]);

  // Limpiar estado de permisos cuando se desmonta el componente
  useEffect(() => {
    return () => {
      dispatch(resetCanPostReview());
      dispatch(resetAlreadyReviewed());
    };
  }, [dispatch]);
 
  const total = reviews.length;
  const average =
    total > 0
      ? reviews.reduce((sum, r) => sum + r.stars, 0) / total
      : 0;
    
  const counts = reviews.reduce((acc, r) => {
    const star = Math.ceil(r.stars);
    acc[star] = (acc[star] || 0) + 1;
    return acc;
  }, {});

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    pct: total > 0 ? (counts[star] || 0) / total : 0,
  }));

  const renderStars = (rating) => {
    const starsList = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        starsList.push(<Icon key={i} as={FaStar} color="#D3A5EE" mt="-2px"/>);
      } else if (rating > i - 1) {
        starsList.push(<Icon key={i} as={FaStarHalfAlt} color="#D3A5EE" mt="-2px"/>);
      } else {
        starsList.push(<Icon key={i} as={FaRegStar} color="#D3A5EE" mt="-2px"/>);
      }
    }
    return <HStack spacing={1}>{starsList}</HStack>;
  };

  const renderInteractiveStars = () => {
    const starsList = [];
    for (let i = 1; i <= 5; i++) {
      starsList.push(
        <Icon
          key={i}
          as={FaStar}
          color={i <= (hover || rating) ? "#D3A5EE" : "gray.300"}
          fontSize="24px"
          cursor="pointer"
          onClick={() => setRating(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          transition="color 0.2s"
          _hover={{ transform: "scale(1.1)" }}
        />
      );
    }
    return <HStack spacing={1}>{starsList}</HStack>;
  };

  // FUNCIÓN ACTUALIZADA - Determinar si puede hacer review
  const canReview = () => {
      // 1. Debe estar logueado
      if (!isLoggedIn) return false;
      
      // 2. Si aún está verificando permisos, no permitir
      if (checkingPermission || checkingReviewed) return false;
      
      // 3. Si hay error de permisos, no permitir
      if (permissionError) return false;
      
      // 4. Vendedores y admins no pueden hacer reviews
      if (user?.type === 'seller' || user?.type === 'admin') return false;
      
      // 5. Si ya hizo una review, no permitir
      if (hasReviewed === true) return false;
      
      // 6. Solo buyers pueden hacer reviews, y solo si la API lo permite
      if (user?.type === 'buyer' && canPost === true && hasReviewed === false) return true;
      
      return false;
  };

  // FUNCIÓN ACTUALIZADA - Mensaje explicativo según el caso
  const getDisabledMessage = () => {
     // 1. Si no está logueado
      if (!isLoggedIn) return "Debes iniciar sesión para dejar una reseña";
      
      // 2. Si está verificando permisos
      if (checkingPermission) return "Verificando permisos...";
      
      // 3. Si está verificando si ya hizo review
      if (checkingReviewed) return "Verificando...";
      
      // 4. Si hay error de permisos
      if (permissionError) return `Error: ${permissionError}`;
      
      // 5. Mensajes específicos según el tipo de usuario
      if (user?.type === 'seller') {
        return "El usuario vendedor no puede subir reseñas";
      }
      
      if (user?.type === 'admin') {
        return "El usuario admin no puede subir reseñas";
      }
      
      // 6. Si ya hizo una review
      if (user?.type === 'buyer' && hasReviewed === true) {
        return "Ya has dejado una reseña para este producto";
      }
      
      // 7. Si es buyer pero no puede hacer review (no compró el producto)
      if (user?.type === 'buyer' && canPost === false) {
        return "Tienes que comprar este producto para poder subir una reseña";
      }
      
      // 8. Fallback general
      if (canPost === false) return "No puedes reseñar este producto";
        return "";
  };

  const handleSubmitReview = async () => {
    if (newReview.trim() && rating > 0 && canReview()) {
      try {
        const resultAction = await dispatch(postReview({
          text: newReview,
          stars: rating,
          id_product: productId
        }));
        
        if (postReview.fulfilled.match(resultAction)) {
          // Éxito - resetear formulario y refrescar reviews
          setNewReview("");
          setRating(0);
          setHover(null);
          setShowForm(false);
          
          // Refrescar la lista de reviews
          dispatch(fetchReviews(productId));
          
          // Volver a verificar permisos después de crear la review
          dispatch(canPostReview(productId));
          
          // Volver a verificar si ya hizo review
          dispatch(checkAlreadyReviewed(productId));
          
          console.log("Review publicada exitosamente!");
        }
      } catch (error) {
        console.error("Error al publicar review:", error);
      }
    }
  };

  // LOGS DE DEBUG ACTUALIZADOS
  console.log("Estado completo canPostReview:", { canPost, checkingPermission, permissionError });
  console.log("Estado completo alreadyReviewed:", { hasReviewed, checkingReviewed });
  console.log("Usuario:", { 
    isLoggedIn, 
    userType: user?.type, 
    userId: user?.id_usuario, 
    token: !!user?.token 
  });
  console.log("canReview() resultado:", canReview());
  console.log("productId:", productId);

  return (
    <Box mt={10} bg="white" p={6} borderTop="1px solid" borderColor="gray.200">
      {/* Botón para publicar opinión - CON ESTILOS DESHABILITADO */}
      <Button
        onClick={() => canReview() && setShowForm(!showForm)} // Solo funciona si puede hacer review
        bg={canReview() ? "#D3A5EE" : "#E2E8F0"} // Color apagado cuando está deshabilitado
        color={canReview() ? "white" : "#A0AEC0"} // Texto gris cuando está deshabilitado
        _hover={{ 
          bg: canReview() ? "#C294E0" : "#E2E8F0", // No cambia el hover si está deshabilitado
          cursor: canReview() ? "pointer" : "not-allowed" // Cursor diferente
        }}
        _active={{ bg: canReview() ? "#B583D6" : "#E2E8F0" }}
        mb={6}
        size="md"
        fontWeight="semibold"
        isLoading={checkingPermission || checkingReviewed}
        loadingText="Verificando..."
        opacity={canReview() ? 1 : 0.6} // Opacidad reducida cuando está deshabilitado
        transition="all 0.2s" // Transición suave entre estados
      >
        {showForm ? "Cancelar" : "Publicar Opinión"}
      </Button>

      {/* Mostrar mensaje explicativo si está deshabilitado */}
      {!canReview() && !checkingPermission && !checkingReviewed && (
        <Text color="gray.500" fontSize="sm" mb={4}>
          {getDisabledMessage()}
        </Text>
      )}

      {error && (
        <Text color="red.500" fontSize="sm" mt={2}>
          Error: {error}
        </Text>
      )}

      {/* Formulario para agregar review - SOLO SI PUEDE HACER REVIEW */}
      {showForm && canReview() && (
        <Box 
          bg="gray.50" 
          p={6} 
          borderRadius="md" 
          border="1px solid" 
          borderColor="gray.200"
          mb={6}
        >
          <VStack spacing={4} align="stretch">
            {/* Calificación con estrellas */}
            <Box>
              <Text mb={2} fontWeight="semibold">
                Calificación
              </Text>
              {renderInteractiveStars()}
              {rating > 0 && (
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {rating} estrella{rating !== 1 ? 's' : ''}
                </Text>
              )}
            </Box>

            {/* Textarea para el comentario */}
            <Box>
              <Text mb={2} fontWeight="semibold">
                Tu opinión
              </Text>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Comparte tu experiencia con este producto..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #E2E8F0",
                  borderRadius: "6px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  fontSize: "14px"
                }}
              />
            </Box>

            {/* Botones del formulario */}
            <HStack spacing={3} justify="flex-end">
              <Button 
                variant="ghost" 
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
              <Button
                bg="#D3A5EE"
                color="white"
                _hover={{ bg: "#C294E0" }}
                onClick={handleSubmitReview}
                isDisabled={!newReview.trim() || rating === 0 || loading}
              >
                {loading ? "Publicando..." : "Publicar"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Resto del componente igual... */}
      <Stack
        align="flex-start"
        spacing={1}
        maxW="400px"
        mb={6}
      >
        {/* Título con número de comentarios */}
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Opiniones del producto
        </Text>

        <HStack align="baseline" spacing={1} mb="-10px" flexWrap="wrap" rowGap="2px" columnGap="4px">
          <Text fontSize="5xl" fontWeight="bold" color="#D3A5EE">
            {average.toFixed(1)}
          </Text>
          {renderStars(average)}
          <Text 
            fontSize="sm" 
            color="gray.500" 
            flexBasis={{ base: "100%", sm: "auto" }}
            mt={{ base:-7, sm: 0 }}   
          >
            {total} Calificaciones
          </Text>
        </HStack>

        <VStack align="stretch" spacing={3} mb={6} w="full" mt="-6px">
          {distribution.map(({ star, pct }) => (
            <Progress.Root
              key={star}
              value={pct * 100}
              size="sm"
              thickness="6px"
              colorScheme="blackAlpha"
              borderRadius="md"
              variant={"subtle"}
            >
              <HStack spacing={2} align="center">
                <Progress.ValueText minW="40px">
                  {Math.round(pct * 100)}%
                </Progress.ValueText>

                <Progress.Track flex="1">
                  <Progress.Range />
                </Progress.Track>

                <Progress.Label>
                  <HStack spacing={1}>
                    <Progress.ValueText>{star} </Progress.ValueText>
                    <Icon as={FaStar} color="#D3A5EE"></Icon>
                  </HStack>
                </Progress.Label>
              </HStack>
            </Progress.Root>
          ))}
        </VStack>
      </Stack>
        
      {reviews.length === 0 && (
        <Text>
          Este producto no tiene reseñas por el momento
        </Text>
      )}
      {/* Listado de reviews */}
      <VStack align="stretch" spacing={6}>
        {reviews.map((r, i) => (
          <ReviewItem
            key={i}
            renderStars={renderStars}
            {...r}
          />
        ))}
      </VStack>
    </Box>
  );
}
