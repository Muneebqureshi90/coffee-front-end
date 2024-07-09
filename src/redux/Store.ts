import { configureStore } from "@reduxjs/toolkit";
import {  productReducer } from './product/ProductSlice';
import authSlice from './auth/AuthSlice';
import { menuReducer } from "./menu/MenuSlice";
import { cartReducer } from "./cart/CartSlice";
import { cartItemReducer } from "./cartItem/cartItemSlice";


// interface AppState {
//     user: { user: any }; // Adjust the type based on your actual state structure
//     products: any; // Adjust the type based on your actual state structure
// }

const store = configureStore({
    reducer: {
        user: authSlice,
        products: productReducer, // Use productReducer instead of productSlice
       menus:menuReducer,
       cart:cartReducer,
        cartItem: cartItemReducer,

    },
});

export default store;
