import MainNavbar from "./components/MainNavbar";
import { Breadcrumb, Stack, Box, Flex, Container } from "@chakra-ui/react";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductSection from "./components/ProductSection";
import {useState, useEffect} from "react";

export default function ProductPage() {
  
  const [stockData, setStockData] = useState(null); 
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [reviewsData, setReviewsData] = useState(null)
    
  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch("http://localhost:1273/product/productById/1");
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setProductData(data);

        const resStock = await fetch(`http://localhost:1273/stock/${data.id_product}`);
        if (!resStock.ok) {
            throw new Error(`Error stock ${resStock.status}`);
        }
        const stockJson = await resStock.json();
        setStockData(stockJson);
        
        const resReviews = await fetch(`http://localhost:1273/review/${data.id_product}`);
        if (!resReviews.ok) {
            throw new Error(`Error stock ${resReviews.status}`);
        }
        const reviewJson = await resReviews.json();
        setReviewsData(reviewJson);



      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }     
    }
    
    fetchAll();
  }, []); 

    const related = [
    {
      id: 1,
      url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-gt-210-msi-1gb-ddr3-0.jpg",
      name: "VIDEO GEFORCE GT 210 MSI 1GB DDR3",
      price: "$41.989,95",
      oldPrice: "$46.188,95",
    },
    {
      id: 2,
        url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-gt-710-2gb-msi-lp-0.jpg",
      name: "VIDEO GEFORCE GT 710 2GB MSI LP",
      price: "$72.369,96",
      oldPrice: "$79.606,91",
    },
    {
      id: 3,
        url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3060-12gb-msi-ventus-2x-oc-0.jpg",
      name: "VIDEO GEFORCE RTX 3060 12GB MSI VENTUS 2X OC",
      price: "$476.560,00",
      
    },
    {
      id: 4,
        url: "http://localhost:5173/product-desc/#",
      image:
        "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3060-12gb-asus-dual-v2-oc-edition-0.jpg",
      name: "VIDEO GEFORCE RTX 3060 12GB ASUS DUAL V2 OC",
      price: "$472.069,94",
      oldPrice: "$519.276,98",
    },
  ];

if (!productData || !stockData || !reviewsData) {
  return <div>Cargando producto...</div>;
}

  return (
    <Flex direction="column" minH="100vh" backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)">
      {/* Navbar */}
      <MainNavbar />

      {/* Contenido principal */}
      <Box flex="1" pt="20px" px={{ base: 0, md: 12 }} mt="20px">
        <Box
        as="main"
        flex="1"
        pt="20px"
        px={{base: 0, md: 12}}
        mt="20px"
        mx="auto"
        maxW={{ base: "100%", md: "1200px"}}
        mb="70px"
        >         
          <Breadcrumb.Root mt={-14} >
            <Breadcrumb.List
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
            
            >
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="http://localhost:5173/"
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
                  href="#"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"
                >
                  PLACAS DE VIDEO
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="#"
                  fontSize="sm"
                  color="#F1E6F7"
                  textDecoration="none"
                  whiteSpace="nowrap"
                  wordBreak="normal"
                  overflowWrap="break-word"                
                >
                  NVIDIA
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
       
            <ProductSection reviews={reviewsData} name={productData.product_name} images={productData.photo_url} description={productData.description} price={productData.price} related={related} stock={stockData.stock} stockWarning={stockData.stock_warning} ></ProductSection> 

        </Box>
      </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}

