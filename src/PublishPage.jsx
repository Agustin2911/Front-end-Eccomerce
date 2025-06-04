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
  Link
} from "@chakra-ui/react";
import { useEffect } from "react";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";

export default function PublishPage({ cart, id_user }) {

    const [sellerShopData, setSellerShopData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id_user) return;

    const fetchCatSubcat = async () => {
      try {
        const resSellerShop = await fetch(`http://localhost:1273/seller_user/shops/${id_user}`);
        if (!resSellerShop.ok) {
          throw new Error(`Error categoría y subcategoría: ${resSellerShop.status}`);
        }
        const jsonSellerShop = await resSellerShop.json();
        setSellerShopData(jsonSellerShop); 
      } catch (err) {
        console.error(err);
      } finally {
          setIsLoading(false);
      } 
    };

    fetchCatSubcat();
  }, [id_user]);





    // 1) Listas de nombres (categorías y subcategorías)
  const categories = [
    "PCs Armadas",
    "Placas de Video",
    "Procesadores",
    "Componentes",
    "Almacenamiento",
    "Memorias RAM",
    "Teclados",
    "Mouses",
    "Auriculares",
    "Accesorios",
    "Streaming",
    "Otros",
    "Notebooks",
  ];

  const subcategories = [
    "PC Gamer",
    "PC Oficina",
    "PC Workstation",
    "AMD Radeon",
    "NVIDIA Geforce",
    "Intel",
    "AMD",
    "Motherboards",
    "Fuentes",
    "Refrigeración",
    "Gabinetes",
    "Conectividad y Redes",
    "Discos SATA",
    "Discos Externos",
    "Discos SSD",
    "DDR3",
    "DDR4",
    "DDR5",
    "SODIMM DDR4",
    "SODIMM DDR5",
    "Teclados Inalámbricos",
    "Teclados Gamer",
    "Teclados USB",
    "Mouses Inalámbricos",
    "Mouses Gamer",
    "Mouses USB",
    "Auriculares Inalámbricos",
    "Auriculares Gamer",
    "Auriculares con Micrófono",
    "Mousepads",
    "Joysticks",
    "Webcams",
    "Micrófonos",
    "Capturadoras de Video",
    "Stream Decks",
    "Pendrives",
    "Sillas Gamer",
    "Impresoras",
    "Proyectores",
    "Notebooks",
    "Monitores",
  ];

  // 2) Estados de campos
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");      // "" o número entero
  const [stockAct, setStockAct] = useState("");   // "" o entero ≥ 0
  const [stockMin, setStockMin] = useState("");   // "" o entero ≥ 0

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");

  // Estado para saber si el cursor está encima del botón deshabilitado
  const [isHoveringDisabled, setIsHoveringDisabled] = useState(false);

  // 3) Handler para cambio de imagen + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFile(null);
      setPreviewUrl(null);
      return;
    }
    // Solo aceptamos archivos de tipo imagen
    if (!file.type.startsWith("image/")) {
      setImageFile(null);
      setPreviewUrl(null);
      return;
    }
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 4) Validaciones individuales
  const nameInvalid = nombre.trim().length === 0;
  const descInvalid = descripcion.trim().length === 0;
  const priceInvalid =
    precio === "" || typeof precio !== "number" || precio <= 0;
  const stockActInvalid =
    stockAct === "" || typeof stockAct !== "number" || stockAct < 0;
  const stockMinInvalid =
    stockMin === "" || typeof stockMin !== "number" || stockMin < 0;
  const imageInvalid = imageFile === null;
  const categoryInvalid = categoria.trim().length === 0;
  const subcategoryInvalid = subcategoria.trim().length === 0;

  // Determina si el botón debe estar deshabilitado
  const isButtonDisabled =
    nameInvalid ||
    descInvalid ||
    priceInvalid ||
    stockActInvalid ||
    stockMinInvalid ||
    imageInvalid ||
    categoryInvalid ||
    subcategoryInvalid;
    


 


  return (
    sellerShopData ? 
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
            Publicar un producto
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
            <Box w="50%" pr={6}>
              {/* 1) Nombre del producto */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && nameInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Nombre del producto:
              </Text>
              <Input
                color="white"
                placeholder="Ingresa el nombre"
                _placeholder={{ color: "whiteAlpha.600" }}
                value={nombre}
                mb={4}
                borderColor={
                  isHoveringDisabled && nameInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setNombre(e.target.value);
                  }
                }}
              />
              <Text
                fontSize="xs"
                color={nombre.length > 100 ? "#EC1877" : "whiteAlpha.600"}
                mb={4}
                textAlign="right"
              >
                {nombre.length}/100
              </Text>


              {/* 2) Descripción (máximo 500 caracteres) */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && descInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Descripción (máximo 500 caracteres):
              </Text>
              <Textarea
                color="white"
                placeholder="Describe tu producto..."
                _placeholder={{ color: "whiteAlpha.600" }}
                value={descripcion}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setDescripcion(e.target.value);
                  }
                }}
                mb={1}
                borderColor={
                  isHoveringDisabled && descInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
                rows={4}
              />
              <Text
                fontSize="xs"
                color={descripcion.length > 500 ? "#EC1877" : "whiteAlpha.600"}
                mb={4}
                textAlign="right"
              >
                {descripcion.length}/500
              </Text>

              {/* 3) Precio (solo enteros) */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && priceInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Precio (ARS) — sólo enteros:
              </Text>
              <Input
                color="white"
                type="text"
                placeholder="Ej. 120999"
                _placeholder={{ color: "whiteAlpha.600" }}
                value={precio === "" ? "" : `${precio}`}
                onChange={(e) => {
                  const soloDigitos = e.target.value.replace(/\D/g, "");
                  setPrecio(
                    soloDigitos === "" ? "" : parseInt(soloDigitos, 10)
                  );
                }}
                mb={4}
                borderColor={
                  isHoveringDisabled && priceInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              />
            </Box>

            {/* ----------------------------
                Columna DERECHA (w="50%")
            ---------------------------- */}
            <Box w="50%">
              {/* 4) Stock actual y Stock mínimo */}
              <HStack spacing={4} mb={4}>
                {/* Stock actual */}
                <Box flex={1}>
                  <Text
                    fontSize="sm"
                    mb={1}
                    color={
                      isHoveringDisabled && stockActInvalid
                        ? "#EC1877"
                        : "whiteAlpha.800"
                    }
                  >
                    Stock actual:
                  </Text>
                  <Input
                    color="white"
                    type="text"
                    placeholder="Ej. 10"
                    _placeholder={{ color: "whiteAlpha.600" }}
                    value={stockAct === "" ? "" : `${stockAct}`}
                    onChange={(e) => {
                      const soloDigitos = e.target.value.replace(/\D/g, "");
                      setStockAct(
                        soloDigitos === "" ? "" : parseInt(soloDigitos, 10)
                      );
                    }}
                    borderColor={
                      isHoveringDisabled && stockActInvalid
                        ? "#EC1877"
                        : "whiteAlpha.800"
                    }
                  />
                </Box>

                {/* Stock mínimo */}
                <Box flex={1}>
                  <Text
                    fontSize="sm"
                    mb={1}
                    color={
                      isHoveringDisabled && stockMinInvalid
                        ? "#EC1877"
                        : "whiteAlpha.800"
                    }
                  >
                    Stock mínimo (alerta):
                  </Text>
                  <Input
                    color="white"
                    type="text"
                    placeholder="Ej. 2"
                    _placeholder={{ color: "whiteAlpha.600" }}
                    value={stockMin === "" ? "" : `${stockMin}`}
                    onChange={(e) => {
                      const soloDigitos = e.target.value.replace(/\D/g, "");
                      setStockMin(
                        soloDigitos === "" ? "" : parseInt(soloDigitos, 10)
                      );
                    }}
                    borderColor={
                      isHoveringDisabled && stockMinInvalid
                        ? "#EC1877"
                        : "whiteAlpha.800"
                    }
                  />
                </Box>
              </HStack>

              {/* 5) Foto del producto */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && imageInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Foto del producto:
              </Text>
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                mb={4}
                borderColor={
                  isHoveringDisabled && imageInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
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

              {/* 6) Selección de Categoría */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && categoryInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Categoría:
              </Text>
              <Box
                as="select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                mb={4}
                border="1px solid"
                borderColor={
                  isHoveringDisabled && categoryInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
                borderRadius="md"
                p={2}
              >
                <option value="">Selecciona categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Box>

              {/* 7) Selección de Subcategoría */}
              <Text
                fontSize="sm"
                mb={1}
                color={
                  isHoveringDisabled && subcategoryInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
              >
                Subcategoría:
              </Text>
              <Box
                as="select"
                value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                mb={4}
                border="1px solid"
                borderColor={
                  isHoveringDisabled && subcategoryInvalid
                    ? "#EC1877"
                    : "whiteAlpha.800"
                }
                borderRadius="md"
                p={2}
              >
                <option value="">Selecciona subcategoría</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </Box>

              {/*
                Envolvemos el botón en un <Box> PARA detectar hover
                aunque <Button> esté deshabilitado.
              */}
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
                >
                 Registrar producto
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>


      <Footer />
    </Flex> : 

        <Flex
      direction="column"
      minH="100vh"
      background="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      <MainNavbar cart={cart} />

      <Box flex="1" display="flex" alignItems="center" justifyContent="center">

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
            Debe registrar al menos una tienda para publicar un producto 
          </Heading>
          <Flex >

            <Box w="100%" pr={6}>

              
                <Link href={"http://localhost:5173/new-shop"} w="100%" variant={"plain"} style={{textDecoration: "none"}}>
                <Button
                  bgColor= "#D3A5EE"  
                  _hover = {{bgColor:"#AE5BDD" }}
                  w="100%"
                  
                >
                  Registrar tienda
                </Button>
              </Link>
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

