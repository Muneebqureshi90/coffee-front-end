import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/ApiConfig';

// Define the type for the cart data
interface CartData {
    id: number;
    user: string;
    // totalPrice: string;
    totalItems: string; // Corrected the property name
    totalDiscountedPrice: string;
    // Add other relevant properties...
}

// Define the initial state for the cart slice
const initialState = {
    cart: null as CartData | null,
    loading: false,
    error: '',
};

// Define an asynchronous thunk for creating a cart
export const createCart = createAsyncThunk(
    'cart/createCart',
    async (userDto: any, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_BASE_URL}/api/cart/create`,
                userDto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Define an asynchronous thunk for fetching user's cart
export const fetchUserCart = createAsyncThunk(
    'cart/fetchUserCart',
    async (userId: number, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Define an asynchronous thunk for adding a cart item
export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async ({ userId, productId, quantity }: { userId: number, productId: string, quantity: number }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API_BASE_URL}/api/cart/addCartItem/${userId}`,
                {
                    userId,
                    productId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Define the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add other reducer functions as needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching user cart.';
            })
            .addCase(addCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.loading = false;
                // Update state if necessary after adding a cart item
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding cart item.';
            })
            .addCase(createCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCart.fulfilled, (state, action) => {
                state.loading = false;
                // Update state if necessary after creating a cart
            })
            .addCase(createCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error creating a cart.';
            });
    },
});

// Export the actions and reducer
export const { /* Add other action creators if needed */ } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Selectors
export const selectCart = (state: any) => state.cart.cart;
export const selectLoading = (state: any) => state.cart.loading;
export const selectError = (state: any) => state.cart.error;
