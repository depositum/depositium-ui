import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { updateBalance, updateRate } from "./action";
import { BalanceState, initialBalanceState } from "./state";

const balanceSlice = createSlice({
  extraReducers: (builder: ActionReducerMapBuilder<BalanceState>) => {
    builder
      .addCase(updateBalance, (state, action) => ({
        ...state,
        balance: action.payload,
      }))
      .addCase(updateRate, (state, action) => ({
        ...state,
        rate: action.payload,
      }));
  },
  initialState: initialBalanceState,
  name: "Balance",
  reducers: {},
});

/**
 * Reducer
 */
export const balanceReducer = balanceSlice.reducer;
