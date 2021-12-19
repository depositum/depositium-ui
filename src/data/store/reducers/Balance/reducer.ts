import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { FeatureKey } from "../../types/FeatureKey";
import {
  updateBalances,
  updateBalanceState,
  updateCurrencies,
  updatePrices,
} from "./action";
import { BalanceState, initialBalanceState } from "./state";

const balanceSlice = createSlice({
  extraReducers: (builder: ActionReducerMapBuilder<BalanceState>) => {
    builder
      .addCase(updateBalanceState, (state, action) => ({
        ...action.payload,
      }))
      .addCase(updateBalances, (state, action) => ({
        ...state,
        balances: action.payload,
      }))
      .addCase(updateCurrencies, (state, action) => ({
        ...state,
        currencies: action.payload,
      }))
      .addCase(updatePrices, (state, action) => ({
        ...state,
        prices: action.payload,
      }));
  },
  initialState: initialBalanceState,
  name: FeatureKey.Balance,
  reducers: {},
});

/**
 * Reducer
 */
export const balanceReducer = balanceSlice.reducer;
