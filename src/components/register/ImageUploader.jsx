import React, { useState, useRef } from "react";
import { Box, Button, Input, Image, Text, VStack } from "@chakra-ui/react";

const ImageUploader = ({ image, setimage }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setimage(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setimage(selected);

      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <Box
      as="form"
      borderRadius="8px"
      w={{ base: "300px", md: "470px" }}
      mx="auto"
      mt="20px"
      mb="20px"
    >
      <Box
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        h="200px"
        border="2px dashed #888"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        cursor="pointer"
        bg="#f9f9f9"
      >
        {preview ? (
          <Image
            src={preview}
            alt="preview"
            maxH="100%"
            maxW="100%"
            objectFit="contain"
          />
        ) : (
          <Text color={"black"}>
            Arrastrá una imagen o hacé clic para seleccionar
          </Text>
        )}
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleFileChange}
        />
      </Box>

      {message && (
        <Text
          color={error ? "red.500" : "green.500"}
          fontSize="sm"
          textAlign="center"
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default ImageUploader;
