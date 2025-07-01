import MainNavbar from "../components/allPages/MainNavbar";
import { Breadcrumb, Stack, Box, Flex, Container } from "@chakra-ui/react";
import Footer from "../components/allPages/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductSection from "../components/productPage/ProductSection";
import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchReviews } from "@/features/fetch/fetchReviews";
import { fetchProductStock } from "@/features/fetch/fetchProductStock";
import { 
  fetchProductById, 
  fetchProductCategorySubcategory, 
  fetchRelatedProducts,
  clearProduct 
} from "@/features/fetch/fetchProductById";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { id_product } = useParams();
  
  // Selectores Redux
  const user = useSelector((state) => state.user);
  const { items: reviewsData, loading: reviewsLoading, error: reviewsError } = useSelector((state) => state.reviews);
  const { item: stockData, loading: stockLoading, error: stockError } = useSelector((state) => state.stock);
  const { 
    product: productData, 
    categorySubcategory: catSubcatData, 
    relatedProducts: relatedData,
    loading: productLoading,
    error: productError 
  } = useSelector((state) => state.productById);

  console.log("🔍 ProductPage Debug:");
  console.log("- id_product:", id_product);
  console.log("- productData:", productData);
  console.log("- stockData:", stockData);
  console.log("- stockLoading:", stockLoading);
  console.log("- stockError:", stockError);

  // Scroll al inicio cuando cambia el producto
  useEffect(() => {
    if (id_product) {
      window.scrollTo(0, 0);
    }
  }, [id_product]);

  // Fetch principal cuando cambia el producto
  useEffect(() => {
    if (id_product) {
      console.log("🚀 Starting fetches for product:", id_product);
      
      // Dispatch de todas las acciones necesarias
      dispatch(fetchProductById(id_product));
      dispatch(fetchProductCategorySubcategory(id_product));
      dispatch(fetchProductStock(id_product));
      dispatch(fetchReviews(id_product));
    }
  }, [dispatch, id_product]);

  // Fetch de productos relacionados cuando se obtiene la categoría
  useEffect(() => {
    if (catSubcatData && catSubcatData[2] && catSubcatData[2] !== "") {
      console.log("🚀 Fetching related products for category:", catSubcatData[2]);
      dispatch(fetchRelatedProducts(catSubcatData[2]));
    }
  }, [dispatch, catSubcatData]);

  // Estados de carga
  if (productLoading && !productData) {
    return (
      <Flex
        direction="column"
        minH="100vh"
        backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
        align="center"
        justify="center"
      >
        <div>Cargando producto...</div>
      </Flex>
    );
  }

  // Manejo de errores del producto principal
  if (productError && !productData) {
    return (
      <Flex
        direction="column"
        minH="100vh"
        backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
        align="center"
        justify="center"
      >
        <div>Error al cargar producto: {productError}</div>
      </Flex>
    );
  }

  // Si no hay datos del producto
  if (!productData) {
    return (
      <Flex
        direction="column"
        minH="100vh"
        backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
        align="center"
        justify="center"
      >
        <div>No se encontró el producto</div>
      </Flex>
    );
  }

  // Datos para breadcrumb con fallbacks seguros
  const categoryUpper = catSubcatData?.[0]?.toUpperCase() || "CATEGORIA";
  const subCategoryUpper = catSubcatData?.[1]?.toUpperCase() || "SUBCATEGORIA";
  const categoryId = catSubcatData?.[2] || "";
  const subCategoryId = catSubcatData?.[3] || "";

  return (
    <Flex
      direction="column"
      minH="100vh"
      backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      {/* Navbar */}
      <MainNavbar />
      <ToastContainer />

      {/* Contenido principal */}
      <Box flex="1" pt="20px" px={{ base: 0, md: 12 }} mt="20px">
        <Box
          as="main"
          flex="1"
          pt="20px"
          px={{ base: 0, md: 12 }}
          mt="20px"
          mx="auto"
          maxW={{ base: "100%", md: "1200px" }}
          mb="70px"
        >
          <Breadcrumb.Root mt={-14}>
            <Breadcrumb.List
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              spacing={2}
            >
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as={RouterLink}
                  to="/"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"
                >
                  HOME
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as={RouterLink}
                  to={
                    categoryId !== "" ? `/products/category/${categoryId}` : "#"
                  }
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"
                >
                  {categoryUpper}
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as={RouterLink}
                  to={
                    subCategoryId !== ""
                      ? `/products/subCategory/${subCategoryId}`
                      : "#"
                  }
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"
                >
                  {subCategoryUpper}
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink
                  fontSize="sm"
                  color="#EC1877"
                  wordBreak="normal"
                  overflowWrap="break-word"
                  maxW="100%"
                >
                  {productData.product_name || "Producto"}
                </Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          {/* DIV ENORME: aquí va toda la info de producto */}
          <Box id="product-container" bg="white" borderWidth="0px" p={6}>
            <ProductSection
              reviews={reviewsData || []}
              name={productData.product_name}
              images={productData.photo_url}
              description={productData.description}
              price={productData.price}
              related={relatedData || []}
              stock={stockData?.stock}
              stockWarning={stockData?.stock_warning}
              id={productData.id_product}
              id_category={categoryId}
              discount={productData.discount}
              discount_state={productData.discount_state}
            />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}
