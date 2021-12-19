import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { initialStrategyState, StrategyState } from "./state";
import { FeatureKey } from "../../types/FeatureKey";
import {
  updateStrategies,
  updateStrategiesApr,
  updateStrategyState,
  updateSummary,
} from "./action";

const strategySlice = createSlice({
  extraReducers: (builder: ActionReducerMapBuilder<StrategyState>) => {
    builder
      .addCase(updateStrategyState, (state, action) => ({
        ...action.payload,
      }))
      .addCase(updateStrategies, (state, action) => ({
        ...state,
        strategies: action.payload,
      }))
      .addCase(updateStrategiesApr, (state, action) => ({
        ...state,
        strategiesApr: action.payload,
      }))
      .addCase(updateSummary, (state, action) => ({
        ...state,
        summary: action.payload,
      }));
  },
  initialState: initialStrategyState,
  name: FeatureKey.Strategy,
  reducers: {},
});

/**
 * Reducer
 */
export const strategyReducer = strategySlice.reducer;
