// src/components/Loader.jsx
import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const glow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 8px #ec1877);
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 20px #ec1877);
    transform: scale(1.05);
  }
`;

export default function Loader({ isLoading = true, onLoadComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Start fade out transition
      setIsVisible(false);
      
      // Remove from DOM after transition completes
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onLoadComplete) {
          onLoadComplete();
        }
      }, 1000); // Match this with your transition duration

      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadComplete]);

  // Don't render if completely hidden
  if (!shouldRender) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="9999"
      bg="rgba(0, 0, 0, 0.7)"
      backdropFilter="blur(12px)"
      WebkitBackdropFilter="blur(12px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      opacity={isVisible ? 1 : 0}
      visibility={isVisible ? "visible" : "hidden"}
      transition="opacity 1s ease-out, visibility 1s ease-out"
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <Image
        src="/logo.svg"
        alt="GC Customs"
        boxSize={{ base: "120px", md: "180px" }}
        animation={`${glow} 2.5s ease-in-out infinite`}
        opacity={isVisible ? 1 : 0}
        transform={isVisible ? "scale(1)" : "scale(0.8)"}
        transition="opacity 0.8s ease-out, transform 0.8s ease-out"
        border="none"
        outline="none"
        _focus={{ outline: "none", boxShadow: "none" }}
        _hover={{ outline: "none" }}
        userSelect="none"
        draggable="false"
      />
    </Box>
  );
}
