import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from "../../config/ApiConfig";
import {RootState} from "@reduxjs/toolkit/query";

// Product interface definition
export interface Product {
    id: string;
    title: string;
    discription: string; // Corrected spelling of 'description'
    amount: number;
    discount_amount: number;
    quantity: number;
    imageUrl: string;
    imageData?: any; // Optional: Add imageData field for storing fetched image data
}

// State interface
interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

// Thunk to fetch products from the server
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/product/`);
    console.log('Product Data:', response);
    return response.data;
});

// Thunk to fetch product image
// export const fetchImage = createAsyncThunk(
//     'products/fetchImage',
//     async (imageName: string, { getState, rejectWithValue }) => {
//         try {
//             const token = (getState() as RootState).auth.token;// Assuming you have a way to get the token from auth state
//             const response = await axios.get(`${API_BASE_URL}/v1/product/image/${imageName}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 responseType: 'blob' // Adjust responseType as per your image format
//             });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching image:', error);
//             throw error;
//         }
//     }
// );

// Redux Toolkit slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.products = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch products';
            })
            // .addCase(fetchImage.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchImage.fulfilled, (state, action: PayloadAction<any, string, { arg: string }>) => {
            //     // Handle successful image fetch if needed
            //     console.log('Fetched image:', action.payload);
            //     // Example: Update product state with fetched image data
            //     state.products = state.products.map(product => {
            //         if (product.imageUrl === action.meta.arg) {
            //             // Update product with image data
            //             return {
            //                 ...product,
            //                 imageData: action.payload,
            //             };
            //         }
            //         return product;
            //     });
            // })
            // .addCase(fetchImage.rejected, (state, action) => {
            //     // Handle image fetch failure if needed
            //     console.error('Failed to fetch image:', action.error);
            //     state.loading = false;
            //     state.error = action.error.message ?? 'Failed to fetch image';
            // });
    },
});

// Export actions and reducer
export const { clearProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;

// Selectors
export const selectProducts = (state: any) => state.products.products;
export const selectLoading = (state: any) => state.products.loading;
export const selectError = (state: any) => state.products.error;
