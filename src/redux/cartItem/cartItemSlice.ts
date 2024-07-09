import { createSlice, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/ApiConfig';

export interface CartItem {
    id: number;
    quantity: number;
    price: number;
    discountedPrice: number;
}

interface CartItemState {
    selectedItems: CartItem[];
    error: string | null;
}

const initialState: CartItemState = {
    selectedItems: [],
    error: null,
};

export const selectItem = createAsyncThunk('cartItem/selectItem', async (cartItem: CartItem) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${API_BASE_URL}/api/cart_item/create`, cartItem, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        // If an error occurs, the rejected action will be dispatched automatically
        throw (error as any).response?.data || 'An error occurred while selecting the item.';
    }
});

export const unselectItem = createAsyncThunk('cartItem/unselectItem', async (itemId: number) => {
    try {
        const token = localStorage.getItem('token');

        await axios.delete(`${API_BASE_URL}/api/cart_item/remove/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return itemId;
    } catch (error) {
        // If an error occurs, the rejected action will be dispatched automatically
        throw (error as any).response?.data || 'An error occurred while unselecting the item.';
    }
});

const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(selectItem.fulfilled, (state, action) => {
                state.selectedItems.push(action.payload);
                state.error = null;
            })
            .addCase(unselectItem.fulfilled, (state, action) => {
                state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addMatcher(isPending, (state) => {
                state.error = null;
            })
            .addMatcher(isRejected, (state, action) => {
                state.error = action.error.message || 'An error occurred.';
            });
    },
});

export const {} = cartItemSlice.actions;

export const selectSelectedItems = (state: { cartItem: CartItemState }) => state.cartItem.selectedItems;
export const selectCartItemError = (state: { cartItem: CartItemState }) => state.cartItem.error;

export const cartItemReducer = cartItemSlice.reducer;
