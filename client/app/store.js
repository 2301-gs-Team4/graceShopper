import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsSlice from "../features/products/allProducts/allProductsSlice";
import singleProductSlice from "../features/products/singleProduct/singleProductSlice";
import cartSlice from "../features/cart/cartSlice";
import guestCartSlice from "../features/cart/guestCartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsSlice,
    singleProduct: singleProductSlice,
    cart: cartSlice,
    guestCart: guestCartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
