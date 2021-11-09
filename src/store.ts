import { configureStore } from "@reduxjs/toolkit";
import strategyItemReducer from "./features/strategyItem/strategyItemSlice";
import priceProviderReducer from "./features/providers/priceSlice";
import { balanceReducer } from "./store/reducers/Balance/reducer";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    prices: priceProviderReducer,
    strategyItem: strategyItemReducer,
  },
});
