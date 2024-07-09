// ProductSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from "../../config/ApiConfig";

// Product interface definition
export interface Menu {
    id: number;
    img: string;
    title: string;
    value: string;
    amount: string;
    discount_amount: string;
    description: string; // Corrected the property name to match the interface
}

// State interface
interface MenuState {
    menus: Menu[]; // Corrected the property name to match the interface
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: MenuState = {
    menus: [], // Corrected the property name to match the interface
    loading: false,
    error: null,
};

// Thunk to fetch products from the server
export const fetchMenus = createAsyncThunk('menus/fetchMenus', async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/product/`);
        console.log('Menu Data:', response);
        return response.data;
    } catch (error) {
        throw error; // Propagate the error for better error handling
    }
});

// Redux Toolkit slice
const menuSlice = createSlice({
    name: 'menus', // Corrected the slice name to match the state property
    initialState,
    reducers: {
        clearMenus: (state) => {
            state.menus = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<Menu[]>) => {
                state.loading = false;
                state.menus = action.payload;
            })
            .addCase(fetchMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch menu';
            });
    },
});

// Export actions and reducer
export const { clearMenus } = menuSlice.actions;
export const menuReducer = menuSlice.reducer; // Corrected the reducer name to match the state property

// Selectors
export const selectMenus = (state: any) => state.menus.menus; // Corrected the selector name to match the state property
export const selectLoading = (state: any) => state.menus.loading; // Corrected the selector name to match the state property
export const selectError = (state: any) => state.menus.error; // Corrected the selector name to match the state property
