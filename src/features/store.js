import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import sellerProductsReducer from "../features/fetch/fetchSellerProducts";
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
import allProductReducer from "../features/fetch/allProductsSlice";
import deleteProductReducer from "../features/fetch/fetchDeleteProduct";
import stocksReducer from "../features/fetch/fetchStocks";
import stockReducer from "../features/fetch/fetchProductStock";
import modifyReducer from "../features/fetch/fetchModifyProduct";
import ReviewsReducer from "../features/fetch/fetchReviews";
import createReviewReducer from "../features/fetch/fetchCreateReview";
import canPostReviewReducer from "../features/fetch/fetchCanPostReview";
import alreadyReviewedReducer from "../features/fetch/fetchAlreadyReviewed";
import productByIdReducer from "../features/fetch/fetchProductById";

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
    allProducts: allProductReducer,
    deleteProductFetch: deleteProductReducer,
    stocks: stocksReducer,
    stock: stockReducer,
    modify: modifyReducer,
    reviews: ReviewsReducer,
    createReview: createReviewReducer,
    canPostReview: canPostReviewReducer,
    alreadyReviewed: alreadyReviewedReducer,
    productById: productByIdReducer,
  },
});
