import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import sellerProductsReducer from "./fetch/fetchSellerProducts";
import authReducer from "../features/fetch/authSlice";
import ordersReducer from "./fetch/ordersSlice";
import registerReducer from "../features/fetch/registerSlice";
import productsReducer from "../features/fetch/productsSlice";
import checkoutReducer from "../features/fetch/checkoutSlice";
import paymentReducer from "../features/fetch/paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    auth: authReducer,
    register: registerReducer,
    orders: ordersReducer,
    products: productsReducer,
    sellerProducts: sellerProductsReducer,
    checkout: checkoutReducer,
    payment: paymentReducer,
  },
});
