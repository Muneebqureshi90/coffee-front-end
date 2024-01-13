import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/AuthSlice'; // Change this line

const store = configureStore({
    reducer: {
        user: authSlice
    }
});

export default store;
