import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { strategyReducer } from "./reducers/Strategy/reducer";
import { balanceReducer } from "./reducers/Balance/reducer";

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    balance: balanceReducer,
    strategy: strategyReducer,
  },
});

// Infer the `StoreState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;

// Inferred type
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
