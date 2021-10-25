import { createSlice } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

const initialState = {
    'f_ref_near': {
        depositAmount: '',
        depositAmountUSD: 0,
        days: 30,
        profit: 0,
        profitUSD: 0,
        apr: 54.3,
    },
    'f_usdt_near': {
        depositAmount: '',
        depositAmountUSD: 0,
        days: 30,
        profit: 0,
        profitUSD: 0,
        apr: 94.3,
    }
};

const calculateProfit = (apr, days, depositAmount) => {
    if (!apr || !days || !depositAmount) {
        return '0';
    }

    try {
        new Decimal(depositAmount);
    } catch (err) {
        return '0';
    }

    const interestPerDay = new Decimal(apr).div(100).div('365');
    const res = interestPerDay.times(days).times(depositAmount);
    return res.toFixed(2);
};

export const strategyItemSlice = createSlice({
    name: 'strategyItem',
    initialState,
    reducers: {
        changeDepositAmount: (state, action) => {
            const { value, strategyId } = action.payload;
            const strategy = state[strategyId];
            strategy.depositAmount = value;
            strategy.profit = calculateProfit(strategy.apr, strategy.days, strategy.depositAmount);
        },
        changeDays: (state, action) => {
            const { value, strategyId } = action.payload;
            const strategy = state[strategyId];
            strategy.days = value;
            strategy.profit = calculateProfit(strategy.apr, strategy.days, strategy.depositAmount);
        },
    },
});

export const { changeDepositAmount, changeDays } = strategyItemSlice.actions;

export const selectStrategyItem = (state, strategyId) => state.strategyItem[strategyId];

export const selectDepositAmount = (state) => state.strategyItem.depositAmount;
export const selectProfit = (state) => state.strategyItem.profit;
export const selectDays = (state) => state.strategyItem.days;

export default strategyItemSlice.reducer;