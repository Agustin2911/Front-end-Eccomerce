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
import sellerReducer from "../features/fetch/fetchSellerData";
import userShopsReducer from "../features/fetch/fetchUserShops";
import registerProductReducer from "../features/fetch/fetchCreateProduct";
import createShopReducer from "../features/fetch/fetchCreateShop";

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
    seller: sellerReducer,
    userShops: userShopsReducer,
    registerProduct: registerProductReducer,
    createShop: createShopReducer,
  },
});
