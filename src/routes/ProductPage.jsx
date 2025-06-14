import MainNavbar from "../components/allPages/MainNavbar";
import { Breadcrumb, Stack, Box, Flex, Container } from "@chakra-ui/react";
import Footer from "../components/allPages/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductSection from "../components/productPage/ProductSection";
import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";



export default function ProductPage({cart, setCart, type, id_user}) {
 console.log("🔍 ShowProductsPage: id_user =", id_user); 
  const { id_product } = useParams();
    
  useEffect(() => {
  if ( id_product ) {
    window.scrollTo(0,0);
    }
  }, [ id_product ]);


  const [stockData, setStockData] = useState({ stock: 0, stock_warning: 0 });
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [reviewsData, setReviewsData] = useState([])
  const [relatedData, setRelatedData] = useState([])  
  const [catSubcatData, setCatSubcatData] = useState("","","","")
  
  useEffect(() => {
    if (!id_product) return;

    const fetchCatSubcat = async () => {
      try {
        const resCatSubcat = await fetch(`http://localhost:1273/product/category-subCategory/${id_product}`);
        if (!resCatSubcat.ok) {
          throw new Error(`Error categoría y subcategoría: ${resCatSubcat.status}`);
        }
        const jsonCatSubcat = await resCatSubcat.json();
        setCatSubcatData(jsonCatSubcat); 
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchCatSubcat();
  }, [id_product]);


  useEffect(() => {
    if (!id_product) return;

    async function fetchAll() {
      try {
        const res = await fetch(
          `http://localhost:1273/product/productById/${id_product}`
        );
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setProductData(data);

        const resStock = await fetch(
          `http://localhost:1273/stock/${id_product}`
        );
        if (!resStock.ok) {
          throw new Error(`Error stock ${resStock.status}`);
        }
        const stockJson = await resStock.json();
        setStockData(stockJson);

        let reviewJson = [];
        try {
          const resReviews = await fetch(
            `http://localhost:1273/review/${id_product}`
          );

          if (resReviews.ok) {
            reviewJson = await resReviews.json();
          } else if (resReviews.status === 412) {
            reviewJson = [];
          } else {
            throw new Error(`Error reviews ${resReviews.status}`);
          }
        } catch (e) {
          console.warn("No se pudo obtener reviews. Asumiendo array vacío:", e);
          reviewJson = [];
        }
        setReviewsData(reviewJson);

        if (catSubcatData && catSubcatData[2] !== '') {
        
            const resRelated = await fetch(`http://localhost:1273/product/byCategoryid/${catSubcatData[2]}`);
            setRelatedData(await resRelated.json())
        }else{
            setRelatedData([])
        }
        
        
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    }
    fetchAll();
  }, [catSubcatData, id_product]); 


  if (
    !productData 
  ) {
    return <div>Cargando producto...</div>;
  }
  const categoryUpper = catSubcatData?.[0]?.toUpperCase() ?? "ERROR"
  const subCategoryUpper = catSubcatData?.[1]?.toUpperCase() ?? "ERROR"
  const categoryId = catSubcatData?.[2] ?? ''
  const subCategoryId = catSubcatData?.[3] ?? ''
  return (
    <Flex
      direction="column"
      minH="100vh"
      backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
    >
      {/* Navbar */}
      <MainNavbar cart={cart} type={type} id_user={id_user} />

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
                  to={categoryId != "" ? `/products/category/${categoryId}` : "#" }
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
                  to={subCategoryId != "" ? `/products/subCategory/${subCategoryId}` : "#" }
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
                  {productData.product_name}
                </Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

       

        {/* DIV ENORME: aquí va toda la info de producto */}
        <Box
          id="product-container"
          bg="white" 
          borderWidth="0px"
          p={6}
        >
       
            <ProductSection reviews={reviewsData} name={productData.product_name} images={productData.photo_url} description={productData.description} price={productData.price} related={relatedData} stock={stockData.stock} stockWarning={stockData.stock_warning} id={productData.id_product} id_category={catSubcatData[2]} cart={cart} setCart={setCart} discount={productData.discount} discount_state={productData.discount_state}></ProductSection> 


        </Box>
      </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}
