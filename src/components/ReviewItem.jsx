import {
  Box,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
 import {
   FaThumbsUp,
 } from "react-icons/fa";
import { useState } from "react";

export default function ReviewItem ({renderStars, rating, date, text, helpful}){
    // const [helpfulCount, setHelpfulCount] = useState(helpful);
    // const [likeActive, setLikeActive] = useState(false);
    // 
    // function handleClick(){
    //     if(!likeActive){
    //         setLikeActive(true);
    //         setHelpfulCount(helpfulCount + 1);
    //     }else{
    //         setLikeActive(false);
    //         setHelpfulCount(helpfulCount - 1);
    //     }
    // };

    return (
        <Box>
             <HStack justify="space-between">
               {renderStars(rating)}
               <Text fontSize="sm" color="gray.500">
                 {date}
               </Text>
             </HStack>
             <Text mt={2} color="gray.700">
               {text}
             </Text>
        </Box>

    );
}   
