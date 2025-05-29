// src/components/ProductSection.jsx
import { useState } from "react"
import { Box,SimpleGrid,Image,Text,Heading,Stack,HStack,VStack,Button,IconButton,Flex,Wrap,Badge,Input,Icon } from "@chakra-ui/react";
import { FaPlus, FaMinus, FaShoppingCart, FaCheckCircle, FaTruck } from "react-icons/fa";
import StockQuantity from "./StockQuantity";
import Description from "./Description";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";

export default function ProductSection() {

    const [quantity, setQuantity] = useState(1);
    const dec = () => setQuantity((q) => Math.max(q - 1, 1));
    const inc = () => setQuantity((q) => q + 1);

    const images = [
    "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-0.jpg",
    "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-1.jpg",
    "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-2.jpg",
    "https://fullh4rd.com.ar/img/productos/3/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-3.jpg",
];
  
    const reviews = [
    {
      rating: 3,
      text: "Regular, todo ok pero hasta ahi.",
      date: "14 sep. 2024",
      helpful: 3,
    },
    {
      rating: 4.5,
      text: "Muy buena placa. Justo lo que necesitábamos para los chicos y el trabajo.",
      date: "22 abr. 2025",
      helpful: 2,
    },
    // …
  ];

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

    const product = {
        code: "VGA2339",
        name: "VIDEO GEFORCE RTX 3050 8GB MSI VENTUS 2X XS OC",
        description: `Esta es una tarjeta gráfica de última generación,
                      ideal para gaming en 1080p y 1440p. Cuenta con 8 GB de GDDR6,
                      un bus de memoria de 128 bit y soporte para ray-tracing en
                      tiempo real.

                      Esta es una tarjeta gráfica de última generación,
                      ideal para gaming en 1080p y 1440p. Cuenta con 8 GB de GDDR6,
                      un bus de memoria de 128 bit y soporte para ray-tracing en
                      tiempo real.`,     
    };

    return( 
       <> 
       <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", sm: "1fr", md: "1fr, 1fr", lg: "2fr 1fr",  xl: "3fr 2fr" }}
        gap={6}
        px={{ base: 4, lg: 6}}
        py={6}
        overflowX="hidden"
        borderBottom="1px solid" 
        borderColor="gray.200"
               
       >
     
            <Box borderBottom="1px solid" borderColor="gray.200" overflowX="auto">
      
                <Image
                    src={images[0]}
                    alt="Imagen principal" 
                    w="full"
                    maxH={{ md: "400px", xl: "900px"}}
                    css={{
                        "@media screen and (min-width: 520px) and (max-width: 767px)": {
                            maxH: "400px"
                        },
                        "@media screen and (min-width: 1055px) and (max-width: 1279px)": {
                            maxH: "900px"
                        },
                        "@media screen and (max-width: 360px)": {
                            maxH: "250px"
                        }

                    }}
                    mb={{ base: 2, md: 4}}
                    objectFit="contain"
                    objectPosition={"left top"}
                    
                />

       
               <Box overflowX="auto" w="full" mt={4} css={{
                           "&::webkit-scrollbar": {
                           display: "none",
                       },
                           scrollbarWidth: "none",
                           "-ms-overflow-style": "none",
                    }}>
                    <HStack spacing={2} minW="max-content"> 
                        {images.map((src,idx)=>(
                        <Image
                        key={idx}
                        src={src}
                        boxSize={{ base: "90px", sm: "100px", md: "100px", lg: "130px" }}
                        objectFit="cover"
                        borderRadius="md"
                        cursor="pointer"
                        flexShrink={0}
                        />
                        ))}
                    </HStack>
                </Box>

       
                <Text fontSize="xs" color="gray.500" mt={2}>
                    * Las imágenes son meramente ilustrativas y no son contractuales.
                </Text>
            </Box>
            
            

            <Box borderLeft={{ base: "none",lg: "1px solid" , xl: "1px solid" }} borderBottom="1px solid" borderColor={{ base: "gray.200", lg: "gray.200", xl: "gray.200"}} pl={{ base : 0, lg: 6}} >
                 <VStack align="stretch" spacing={{base: "3", md: "4"}}>
                 
                         <Text fontSize="sm" color="gray.500">
                            Código del producto: {product.code}
                        </Text>
                    <Heading fontSize={{ base: "lg", md: "2xl" }} mt="-3">{product.name}</Heading>
                    
                    <Stack spacing={0}>
                        <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
                            12 cuotas sin interés de:{" "}
                            <Text as="span" color="#EC1877" fontWeight="bold">
                                $34.980,83
                            </Text>
                        </Text>
                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt="-20px">
                            ** Sobre el precio de lista
                        </Text>
                    </Stack>

                    
                    <Stack spacing={0}>
                        <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
                            Precio especial:{" "}
                            <Text as="span" color="green.500">
                                $322.899,99
                            </Text>
                        </Text>
                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt="-20px" whiteSpace="normal" wordBreak="break-word">
                            ** Abonando con débito, transferencia o efectivo en el local
                        </Text>
                    </Stack>

                    <StockQuantity />
                     <Box
                        maxW="400px"
                        h="1px"
                        bg="gray.300"
                        mt="-5px"
                        mb="10px"
                    />
                   

                    <Flex align="center" gap={{ base: 2, md: 4 }}>
                        <IconButton
                            aria-label="Disminuir cantidad"
                            colorPalette="#AE5BDD"
                            variant="unstyled"
                            color="#AE5BDD"
                            onClick={dec}
                           _hover={{color: "#422A52"}}
                        >
                            <FaMinus/>
                        </IconButton>
                        <Input
                            value={quantity}
                            readOnly
                            w="60px"
                            textAlign="center"
                        />
                        <IconButton
                            aria-label="Aumentar cantidad"
                            color="#AE5BDD"
                            variant="unstyled"
                            onClick={inc}
                            _hover={{color: "#422A52"}}
                        >
                            <FaPlus/>
                         </IconButton>
                    </Flex>
                  
                    <Button bg="#AE5BDD" size={{ base: "sm", md: "lg" }} w="100%" _hover={{bg: "#422A52"}} py={{ base: 2, md: 3 }} 
                      css={{
                          "@media screen and (max-width: 321px)": {
                              w:"100%"
                        },
                      }}>
                        Comprar ahora
                    </Button>
                    <HStack spacing={4} w="100%">
                        <Button 
                        borderWidth="2px" 
                        borderColor="#AE5BDD" 
                        variant="outline" 
                        flex="1" 
                        _hover={{bg: "#422A52",color: "white", borderColor:"#422A52"}}
                        fontSize={{ base: "sm", md: "sm" }}
                        css={{
                          "@media screen and (max-width: 321px)": {
                              maxW:"50%",
                              fontSize: "xs"
                            },
                        }}
                        >
                            <FaTruck /> Calcular envío
                        </Button>
                        <Button
                            borderWidth="2px"
                            borderColor="#AE5BDD"
                            variant="outline"
                            flex="1"
                            _hover={{bg: "#422A52",color: "white", borderColor:"#422A52"}}
                            fontSize={{ base: "sm", md: "sm" }}
                             css={{
                                "@media screen and (max-width: 321px)": {
                                    maxW:"50%",
                                    fontSize: "xs"
                                },
                             }}
                            >
                            <FaShoppingCart/> Agregar
                        </Button>
                    </HStack>
                  
                    <Wrap spacing={2} mb="10px">
                            {[
                                "msi",
                                "geforce",
                                "rtx",
                                "rtx 3050",
                                "8gb",
                                "gddr6",
                                "max5",
                                "promo",
                            ].map((tag) => (
                                <Badge key={tag} size={{ base: "xs", md: "sm" }} variant="subtle" bg="#F1E6F7" >
                                    {tag}
                                </Badge>
                            ))}
                    </Wrap>
                 </VStack>
            </Box>  
        
            
                
        </Box>
        <Description description={product.description} />
        <RelatedProducts  products={related}   />
        <ProductReviews reviews={reviews}/>
        
       </>
    );
}

