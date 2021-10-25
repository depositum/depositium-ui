import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'f_ref_near': {
        type: 'Farming',
        name: 'REF-NEAR',
        apr: '54.45',
        maxDays: 90,
    },
    'f_usdt_near': {
        type: 'Farming',
        name: 'USDT-NEAR',
        apr: '92.23',
        maxDays: 90,
    }
};


export const strategiesSlice = createSlice({
    name: 'strategies',
    initialState,
    reducers: {},
});

export const selectStrategies = (state) => state.strategies;

export default strategiesSlice.reducer;