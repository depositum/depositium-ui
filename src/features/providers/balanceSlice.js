import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAccountBalance } from './contractAPI';

const initialState = {
    balances: {},
};

export const fetchAccountBalanceAsync = createAsyncThunk(
    'balance/fetchBalance',
    async () => {
        console.log('Fetching account balance');
        const response = await fetchAccountBalance();
        return response;
    }
);

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountBalanceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAccountBalanceAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('action.payload', action.payload);
                state.balances = action.payload; 
            });
    },
});

export const selectAccountBalance = (state) => state.balance.balances;

export default balanceSlice.reducer;