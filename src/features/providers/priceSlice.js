import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPricesFromREF } from './contractAPI';
import Decimal from 'decimal.js';

const initialState = {
    nearPrice: 0,
};

export const fetchPricesAsync = createAsyncThunk(
    'prices/fetchPrices',
    async () => {
        console.log('Fetching the prices');
        const response = await fetchPricesFromREF();
        return response;
    }
);

export const priceSlice = createSlice({
    name: 'prices',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPricesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPricesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('action.payload', action.payload);
                state.nearPrice = action.payload; 
            });
    },
});

export const selectNearPrice = (state) => new Decimal(state.prices.nearPrice);

export default priceSlice.reducer;