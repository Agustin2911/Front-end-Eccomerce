import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { deleteProductFetch, resetDeleteProduct } from "../features/fetch/fetchDeleteProduct";
import MainNavbar from "../components/allPages/MainNavbar";
import Footer from "../components/allPages/Footer";
import Loader from "../components/landingPage/Loader";
import { fetchSellerProducts } from "../features/fetch/FetchSellerProducts";
import { deleteProduct } from "../features/fetch/allProductsSlice";
import { ToastContainer } from "react-toastify";
import { fetchAllStocks } from "../features/fetch/fetchStocks";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  VStack,
  Image,
  Button,
  Link
} from "@chakra-ui/react";

export default function MyProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, type, id_usuario } = useSelector((state) => state.user);
  const { sellerList, sellerLoading, sellerError } = useSelector(
    (state) => state.sellerProducts
  );
  const { items: stockList, loading: stocksLoading } = useSelector(
    (state) => state.stocks
  );
  
  const [updatedList, setUpdatedList] = useState(sellerList); 

  useEffect(() => {
    if (!token || type !== "seller") {
      navigate("/signup", { replace: true });
      return;
    }
    dispatch(fetchSellerProducts());
    dispatch(fetchAllStocks()); 
  }, [dispatch, navigate, token, type]);

    useEffect(() => {
        setUpdatedList(sellerList);
    }, [sellerList]);


    const handleDelete = (id) => {
        dispatch(deleteProductFetch(id)).then((result) => {
            if (result.type === 'product/deleteProduct/fulfilled') {
                dispatch(deleteProduct(result.payload));
                const newList = updatedList.filter((item) => item.id_product != id)
                setUpdatedList(newList);
            }
          });
      
  };

  


  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);

  if (sellerLoading) return <Loader />;
  if (sellerError)
    return (
      <Text color="red.400" p={6}>
        {sellerError}
      </Text>
    );

    if (sellerList.length === 0) {
    return (
      <Flex
        direction="column"
        backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
        minH="100vh"
      >
        <MainNavbar />
        <Flex flex="1" direction="column" justify="center" align="center">
          <Text color="#F1E6F7" fontSize="2xl" mb={4}>
            No tienes productos publicados
          </Text>
          <Link
            as={RouterLink}
            to={`/publish`}
            w="200px"
            style={{ textDecoration: "none" }}
          >
            <Button
              bgColor="#D3A5EE"
              _hover={{ bgColor: "#AE5BDD" }}
              w="100%"
            >
              Publica uno
            </Button>
          </Link>
        </Flex>
        <Footer />
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      backgroundImage="linear-gradient(180deg, #180B1F 0%, #24142F 50%, #0A0410 100%)"
      minH="100vh"
    >
      <MainNavbar />

      <Box flex="1" w="80%" mx="auto" py={8}>
      <ToastContainer />
        <SimpleGrid columns={[1, 2]} spacing={10} justifyItems="center">
          {updatedList.map((item) => {
            console.log(stockList)
            const stockForThis = stockList.find(
                    (s) => s.id === item.id_product
                );
            console.log(stockForThis);
            const amount = stockForThis ? stockForThis.stock : 0;

              return (
                          <Box
              key={item.id_product}
              w="100%"
              maxW="400px"
              bg="#170D20"
              border="1px solid #AE5BDD"
              borderRadius="md"
              p={4}
              boxShadow="0 8px 12px rgba(0,0,0,0.15), 0 16px 35px rgba(139,92,246,0.4)"
            >
              <VStack align="start" spacing={4}>
                <Link
                as={RouterLink}
                to={`/product-desc/${item.id_product}`}
                style={{ textDecoration: "none" }}
                
                >
                    <Heading size="md" color="#F1E6F7" _hover={{ color: "#EC1877"}}> 
                        {item.product_name}
                    </Heading>
                </Link>
                <VStack align="start" spacing={1} w="100%">
                  <Text color="#F1E6F7">Stock actual: {amount}</Text>
                  <Text color="#F1E6F7">Precio: {
                      item.discount_state === "false" ? 
                        formatPrice(item.price) : 
                        formatPrice(item.price - item.price*item.discount/100)
                      }
                  </Text>
                </VStack>

                <Image
                  src={item.photo_url}
                  alt={item.product_name}
                  w="100%"
                  maxH="225px"
                  objectFit="cover"
                  borderRadius="md"
                />

                <Flex w="100%" mt={4} gap={4}>
                  <Button
                    py={2}
                    px={4}
                    fontSize="sm"
                    transition="box-shadow 0.2s ease"
                    width="48%"
                    borderWidth="2px"
                    borderColor="#EC1877"
                    variant="outline"
                    color="#F1E6F7"
                    _hover={{
                      bg: "#EC1877",
                      color: "#F1E6F7",
                      borderColor: "#EC1877",
                      boxShadow: "0 0 8px 2px #EC1877",
                    }}
                    onClick={() => handleDelete(item.id_product)}
                  >
                    Eliminar producto
                  </Button>
                  <Button
                    py={2}
                    px={4}
                    fontSize="sm"
                    transition="box-shadow 0.2s ease"
                    width="48%"
                    borderWidth="2px"
                    borderColor="#EC1877"
                    variant="outline"
                    color="#F1E6F7"
                    _hover={{
                      bg: "#EC1877",
                      color: "#F1E6F7",
                      borderColor: "#EC1877",
                      boxShadow: "0 0 8px 2px #EC1877",
                    }}
                    onClick={() => navigate(`/modify-product/${item.id_product}`)}
                  >
                    Modificar producto
                  </Button>
                </Flex>

              </VStack>
            </Box>
              )})}
        </SimpleGrid>
      </Box>

      <Footer />
    </Flex>
  );
}
