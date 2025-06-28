import React, { useState } from "react";
import { Flex, Box, Heading, Text, Input, Textarea, Button, HStack, Image } from "@chakra-ui/react";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PublishPage() {

    
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token || user.type !== "seller") {
      navigate("/signup", { replace: true });
    }
  }, [user.token, user.type, navigate]);



  const { id_product } = useParams();
  const allProducts = useSelector(state => state.allProducts.items);
  const productId = parseInt(id_product, 10);
  const product = allProducts.find(p => p.id_product === productId);



  // Estados para inputs
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stockAct, setStockAct] = useState("");
  const [stockMin, setStockMin] = useState("");
  const [estadoDescuento, setEstadoDescuento] = useState("");
  const [descuento, setDescuento] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);


  
   useEffect(() => {
    if (!product) return;
    setNombre(product.product_name || "");
    setDescripcion(product.description || "");
    setPrecio(product.price || "");
    setStockAct("");
    setStockMin("");
    setEstadoDescuento(product.discount_state === "true" ? "activar" : "desactivar");
    setDescuento(product.discount || "");
    setPreviewUrl(product.photo_url || null);
  }, [product]);



  // Estado para hover en botón deshabilitado
  const [isHoveringDisabled, setIsHoveringDisabled] = useState(false);
  
  // Validaciones individuales
  const nameInvalid = nombre.trim().length === 0;
  const descInvalid = descripcion.trim().length === 0;
  const priceInvalid = precio === "" || parseInt(precio, 10) <= 0;
  const stockActInvalid = stockAct === "" || parseInt(stockAct, 10) < 0;
  const stockMinInvalid = stockMin === "" || parseInt(stockMin, 10) < 0;
  const estadoInvalid = estadoDescuento === "";
  const discountInvalid = estadoDescuento === "activar" && descuento === "";
  const urlInvalid = previewUrl === null;
  // Determina si el botón debe estar deshabilitado
  const isButtonDisabled =
    nameInvalid ||
    descInvalid ||
    priceInvalid ||
    stockActInvalid ||
    stockMinInvalid ||
    estadoInvalid ||
    discountInvalid ||
    urlInvalid;

  return (
    <Flex
      direction="column"
      minH="100vh"
      background="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      <MainNavbar />

      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          maxW="800px"
          w="100%"
          mb={8}
          mt={8}
          bg="rgba(0, 0, 0, 0.7)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          <Heading as="h1" size="lg" mb={6} textAlign="center" color="#AE5BDD">
            Modifica tu producto
          </Heading>

          <Flex flexDirection={["column", "row"]} gap={6}>
            {/* Columna izquierda */}
            <Box flex="1">
              <Text fontSize="sm" mb={1} color={isHoveringDisabled && nameInvalid ? "#EC1877" : "whiteAlpha.800"}>
                Nombre del producto:
              </Text>
              <Input
                color="white"
                placeholder="Ingresa el nombre"
                _placeholder={{ color: "whiteAlpha.600" }}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                mb={4}
                borderColor={isHoveringDisabled && nameInvalid ? "#EC1877" : "whiteAlpha.800"}
              />

              <Text fontSize="sm" mb={1} color={isHoveringDisabled && descInvalid ? "#EC1877" : "whiteAlpha.800"}>
                Descripción:
              </Text>
              <Textarea
                color="white"
                placeholder="Describe tu producto..."
                _placeholder={{ color: "whiteAlpha.600" }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                mb={4}
                borderColor={isHoveringDisabled && descInvalid ? "#EC1877" : "whiteAlpha.800"}
                rows={4}
              />

              <Text fontSize="sm" mb={1} color={isHoveringDisabled && priceInvalid ? "#EC1877" : "whiteAlpha.800"}>
                Precio (ARS):
              </Text>
              <Input
                color="white"
                type="number"
                placeholder="Ej. 120999"
                _placeholder={{ color: "whiteAlpha.600" }}
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                mb={4}
                borderColor={isHoveringDisabled && priceInvalid ? "#EC1877" : "whiteAlpha.800"}
              />
            </Box>

            {/* Columna derecha */}
            <Box flex="1">
              <HStack spacing={4} mb={4}>
                <Box flex={1}>
                  <Text fontSize="sm" mb={1} color={isHoveringDisabled && stockActInvalid ? "#EC1877" : "whiteAlpha.800"}>
                    Stock actual:
                  </Text>
                  <Input
                    color="white"
                    type="number"
                    placeholder="Ej. 10"
                    _placeholder={{ color: "whiteAlpha.600" }}
                    value={stockAct}
                    onChange={(e) => setStockAct(e.target.value)}
                    borderColor={isHoveringDisabled && stockActInvalid ? "#EC1877" : "whiteAlpha.800"}
                  />
                </Box>

                <Box flex={1}>
                  <Text fontSize="sm" mb={1} color={isHoveringDisabled && stockMinInvalid ? "#EC1877" : "whiteAlpha.800"}>
                    Stock mínimo:
                  </Text>
                  <Input
                    color="white"
                    type="number"
                    placeholder="Ej. 2"
                    _placeholder={{ color: "whiteAlpha.600" }}
                    value={stockMin}
                    onChange={(e) => setStockMin(e.target.value)}
                    borderColor={isHoveringDisabled && stockMinInvalid ? "#EC1877" : "whiteAlpha.800"}
                  />
                </Box>
              </HStack>

              <Text fontSize="sm" mb={1} color="whiteAlpha.800">
                Foto del producto:
              </Text>
              <Input
                type="file"
                accept="image/*"
                mb={4}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewUrl(reader.result);
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewUrl(null);
                  }
                }}
                borderColor={isHoveringDisabled && nameInvalid ? "#EC1877" : "whiteAlpha.800"}
              />
              {previewUrl && (
                <Box textAlign="center" mb={4}>
                  <Image
                    src={previewUrl}
                    alt="Vista previa"
                    maxH="150px"
                    mx="auto"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Box>
              )}

              <Text fontSize="sm" mb={1} color={isHoveringDisabled && estadoInvalid ? "#EC1877" : "whiteAlpha.800"}>
                Estado de descuento:
              </Text>
              <Box
                as="select"
                value={estadoDescuento}
                onChange={(e) => setEstadoDescuento(e.target.value)}
                mb={4}
                border="1px solid"
                borderColor={isHoveringDisabled && estadoInvalid ? "#EC1877" : "whiteAlpha.800"}
                borderRadius="md"
                p={2}
              >
                <option value="">Selecciona estado</option>
                <option value="activar">Activar</option>
                <option value="desactivar">Desactivar</option>
              </Box>

              {estadoDescuento === "activar" && (
                <>
                  <Text fontSize="sm" mb={1} color={isHoveringDisabled && discountInvalid ? "#EC1877" : "whiteAlpha.800"}>
                    Descuento (en %):
                  </Text>
                  <Input
                    color="white"
                    type="number"
                    min={0}
                    max={99}
                    placeholder="0 - 99"
                    value={descuento}
                    onChange={(e) => setDescuento(e.target.value)}
                    mb={6}
                    borderColor={isHoveringDisabled && discountInvalid ? "#EC1877" : "whiteAlpha.800"}
                  />
                </>
              )}

              <Box
                onMouseEnter={() => isButtonDisabled && setIsHoveringDisabled(true)}
                onMouseLeave={() => isButtonDisabled && setIsHoveringDisabled(false)}
              >
                <Button
                  bgColor={isButtonDisabled ? "#D3A5EE" : "#AE5BDD"}
                  w="100%"
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? "Completa todos los campos" : "Actualizar producto"}
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Footer />
    </Flex>
  );
}

