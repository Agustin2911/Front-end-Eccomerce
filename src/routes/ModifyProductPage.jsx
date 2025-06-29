import { useState } from "react";
import { Flex, Box, Heading, Text, Input, Textarea, Button, HStack, Image, Spinner} from "@chakra-ui/react";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductStock } from "../features/fetch/fetchProductStock";
import { modifyProduct, modifyStock } from "../features/fetch/fetchModifyProduct";
import { toast, ToastContainer } from "react-toastify";
import { updateProduct } from "@/features/fetch/allProductsSlice";

export default function ModifyProductPage() {

    
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!user.token || user.type !== "seller") {
      navigate("/signup", { replace: true });
    }
  }, [user.token, user.type, navigate]);



  const { id_product } = useParams();
  const allProducts = useSelector(state => state.allProducts.items);
  const productId = parseInt(id_product, 10);
  const product = allProducts.find(p => p.id_product === productId);

  const { item: stockItem, loading: stockLoading } = useSelector(
    (s) => s.stock
  );
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductStock(productId));
    }
  }, [dispatch, productId]);


  // Estados para inputs
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stockAct, setStockAct] = useState("");
  const [estadoDescuento, setEstadoDescuento] = useState("");
  const [descuento, setDescuento] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

    
  
   useEffect(() => {
    if (!product) return;
    setNombre(product.product_name || "");
    setDescripcion(product.description || "");
    setPrecio(product.price || "");
    setEstadoDescuento(product.discount_state === "true" ? "activado" : "desactivado");
    setDescuento(product.discount || "");
    setPreviewUrl(product.photo_url || null);
  }, [product]);

  useEffect(() => {
    if (!stockItem) return; 
    setStockAct(0);
  },[stockItem]);

  // Estado para hover en botón deshabilitado
  const [isHoveringDisabled, setIsHoveringDisabled] = useState(false);
  
  // Validaciones individuales
  const nameInvalid = nombre.trim().length === 0;
  const descInvalid = descripcion.trim().length === 0;
  const priceInvalid = precio === "" || parseInt(precio, 10) <= 0;
  const stockActInvalid = stockAct === "";
  const estadoInvalid = estadoDescuento === "";
  const discountInvalid = estadoDescuento === "activado" && descuento === "";
  const urlInvalid = previewUrl === null;
  // Determina si el botón debe estar deshabilitado
  const isButtonDisabled =
    nameInvalid ||
    descInvalid ||
    priceInvalid ||
    stockActInvalid ||
    estadoInvalid ||
    discountInvalid ||
    urlInvalid;

    const handleModifyClick = () => {
    dispatch(
      modifyProduct({
        id_product: productId,
        product_name: nombre,
        description: descripcion,
        price: Number(precio),
        discount_state: estadoDescuento === "activado" ? "true" : "false",
        discount: Number(descuento),
        photo_url: product.photo_url,
        
      })
    )
    .unwrap()
    .then((updatedProduct) => {
      // 1) Actualizo el stock en el servidor
      return dispatch(modifyStock({ productId, delta: Number(stockAct) }))
        .unwrap()
        .then(() => updatedProduct); // paso el producto actualizado a la siguiente promesa
    })
    .then((updatedProduct) => {
      // 2) Despacho la acción que actualiza el store global
      dispatch(updateProduct(updatedProduct));
      // 3) Muestro el toast y navego
      toast.success("Su producto fue modificado con éxito", {
        autoClose: 2000,
        theme: "colored",
      });
      setTimeout(() => navigate("/my-products"), 400);
    })
    .catch((err) => {
      console.error("Error al modificar:", err);
      toast.error("Hubo un error al modificar el producto", {
        autoClose: 2000,
        theme: "colored",
      });
    });
};
  if (stockLoading || stockItem === null) {
    return (
        <Flex align="center" justify="center" minH="60vh">
            <Spinner color="purple.400" />
        </Flex>
        );
    }

  return (
    <Flex
      direction="column"
      minH="100vh"
      background="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >

      <MainNavbar />

      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <ToastContainer />

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
                    disabled
                    color="white"
                    type="number"
                    placeholder="Ej. 10"
                    _placeholder={{ color: "whiteAlpha.600" }}
                    value={stockItem.stock}
                    borderColor={"whiteAlpha.800"}
                  />
                </Box>

                <Box flex={1}>
                  <Text fontSize="sm" mb={1} color={"whiteAlpha.800"}>
                    Modificar stock ( - / + ):
                  </Text>
                  <Input
                    color="white"
                    type="number"
                    placeholder="0"
                    _placeholder={{ color: "whiteAlpha.600" }}
                    value={stockAct}
                    onChange={(e) => setStockAct(e.target.value)}
                    borderColor={"whiteAlpha.800"}
                  />
                </Box>
              </HStack>

              <Text fontSize="sm" mb={1} color="whiteAlpha.800">
                Foto del producto:
              </Text>
              
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
                <option value="activado">Activado</option>
                <option value="desactivado">Desactivado</option>
              </Box>

              {estadoDescuento === "activado" && (
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
                  onClick={handleModifyClick}
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

