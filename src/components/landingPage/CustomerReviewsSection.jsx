import React, { useState } from "react";
import { Box, Flex, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BG_A from "../../assets/auriculares.svg";

const CustomerReviewsSection = () => {
  // Datos de ejemplo para las reseñas
  const reviews = [
    {
      id: 1,
      text: "Aca consegui una bateria para mi notebook, aguante Linux papa",
      author: "Agustin Romero",
      rating: 5,
      date: "2 days ago"
    },
    {
      id: 2,
      text: "Estoy super contento con mi nueva Lenovo Legion, aguante WSL papa",
      author: "Tomas Rech",
      rating: 5,
      date: "1 week ago"
    },
    {
      id: 3,
      text: "pude conseguir un nuevo monitor, larga vida al 240hz papa",
      author: "elias lezcano",
      rating: 5,
      date: "2 weeks ago"
    },
    {
      id: 4,
      text: "Te traen de todo a tu casa, hasta un server rack de 3 metros",
      author: "Patricio Funes",
      rating: 5,
      date: "3 weeks ago"
    },
    {
      id: 5,
      text: "No venden memorias RAM DDR1 :(",
      author: "Ari Edelstein",
      rating: 1.5,
      date: "1 month ago"
    },
    {
      id: 6,
      text: "Aguante GC Customs",
      author: "Gisele Cuello",
      rating: 5,
      date: "1 month ago"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} as={FaStar} color="#EC1877" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Icon key="half" as={FaStarHalfAlt} color="#EC1877" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} as={FaRegStar} color="#EC1877" />);
    }
    
    return stars;
  };

  return (
  <Box bgImage={`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${BG_A})`} bgPosition="center" bgSize="cover"
      bgRepeat="no-repeat" borderRadius="lg" py={[4, 6, 8]} px={{ base: 4, md: 8 }}>
    <Flex 
      direction={{ base: "column", lg: "row" }} 
      maxW="1200px" 
      mx="auto"
      align="center"
      gap={[6, 8, 10]}
      justify="center"
    >
      {/* Sección de rating - izquierda en desktop, arriba en mobile */}
      <VStack 
        spacing={[3, 4]} 
        textAlign="center" 
        flex={{ base: "1", lg: "0 0 350px" }}
        w={{ base: "100%", lg: "auto" }}
      >
        <Text fontSize={["4xl", "5xl", "6xl"]} fontWeight="bold" color="#F1E6F7">
          4.4
        </Text>
        <HStack spacing={1}>
          {renderStars(4.4)}
        </HStack>
        <Text fontSize={["md", "lg"]} fontWeight="semibold" color="#F1E6F7">
          Reseñas de Google
        </Text>
        <Text 
          fontSize={["sm", "md"]} 
          color="#F1E6F7" 
          maxW={{ base: "100%", lg: "300px" }}
          textAlign="center"
          px={{ base: 2, lg: 0 }}
        >
          Nuestros clientes confian en nuestros servicios, por eso se ve reflejado en nuestras reseñas. Dejanos tu opinión para brindarte un mejor servicio!
        </Text>
      </VStack>

      {/* Sección del carrusel - derecha en desktop, abajo en mobile */}
      <VStack 
        spacing={[4, 6]} 
        flex="1" 
        w={{ base: "100%", lg: "auto" }}
        maxW={{ base: "100%", lg: "600px" }}
      >
        <Text 
          fontSize={["lg", "xl", "2xl"]} 
          fontWeight="bold" 
          color="#F1E6F7" 
          textAlign="center"
          px={{ base: 2, md: 0 }}
        >
          Nuestros clientes dicen
        </Text>
        
        <Box width="100%">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              enabled: true,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            style={{
              "--swiper-navigation-color": "#F1E6F7",
              "--swiper-pagination-color": "#EC1877",
              "--swiper-pagination-bullet-inactive-color": "#F1E6F7",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-navigation-size": "20px",
              paddingBottom: "40px",
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <VStack 
                  spacing={[3, 4]} 
                  p={[4, 6]} 
                  bg="rgba(0, 0, 0, 0.1)"
                  backdropFilter="blur(8px)"
                  border="1px solid rgba(94, 84, 84, 0.2)" 
                  borderRadius="lg" 
                  mx={{ base: 1, md: 0 }}
                  minH={{ base: "250px", md: "250px" }} // Altura mínima fija
                  maxH={{ base: "250px", md: "250px" }} // Altura máxima fija
                  justify="space-between" // Distribuye el contenido uniformemente
                  align="center"
                >
                  <Text
                    fontSize={["sm", "md", "lg"]}
                    textAlign="center"
                    color="#F1E6F7"
                    fontStyle="italic"
                    position="relative"
                    noOfLines={[2, 2]}
                    lineHeight="1.4"
                    px={{ base: 1, md: 4 }}
                  >
                    <Text as="span" fontSize="2xl" color="#EC1877" position="absolute" left="-6px" top="-6px">
                      "
                    </Text>
                    {review.text}
                    <Text as="span" fontSize="2xl" color="#EC1877" position="absolute" right="-6px" bottom="-12px">
                      "
                    </Text>
                  </Text>
                  <HStack spacing={1}>
                    {renderStars(review.rating)}
                  </HStack>
                  <VStack spacing={1}>
                    <Text fontWeight="semibold" color="#F1E6F7" fontSize={["xs", "sm", "md"]}>
                      {review.author}
                    </Text>
                    <Text fontSize={["xs", "xs", "sm"]} color="#F1E6F7">
                      {review.date}
                    </Text>
                  </VStack>
                </VStack>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        
        <Text
          color="#EC1877"
          fontSize={["xs", "sm"]}
          textDecoration="none"
          cursor="pointer"
          _hover={{ color: "#d1166a", textDecoration: "none" }}
          onClick={() => window.open("https://www.google.com/search?sca_esv=c258e1c0eae32aae&rlz=1C1ALOY_esAR1085AR1085&sxsrf=AE3TifPqt9_nq8eNR-_U7BDbLysRWaUorw:1750705577960&si=AMgyJEsVtO7Zu9YEyquic0WJtZiamUti8WlVIiHVse8gMEYCleYF_OgjnEe63z0KixelU20fGUFRgEYsl9KmIF7Z6bklW91cP4vRwe-2S6cJqGYYLhQc_ewqww9poHuqSYosHYT9ii8n&q=UADE+Opiniones&sa=X&ved=2ahUKEwjMqdLAnoiOAxWgpZUCHekGHAgQ0bkNegQIOxAE&biw=1920&bih=919&dpr=1#lrd=0x95bccaba6ac89b35:0x1a2dc24cbca665a7,1,,,,", "_blank")}
        >
          Mas reseñas en Google
        </Text>
      </VStack>
    </Flex>
  </Box>
);

};

export default CustomerReviewsSection;
