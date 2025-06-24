import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import productsReducer from "./products/productSlice";
import sellerProductsReducer from "./fetch/fetchSellerProducts";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    sellerProducts: sellerProductsReducer,
  },
});
