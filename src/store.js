import { configureStore } from '@reduxjs/toolkit';
import strategyItemReducer from './features/strategyItem/strategyItemSlice';
import strategiesReducer from './features/strategies/strategiesSlice';
import priceProviderReducer from './features/providers/priceSlice';

export const store = configureStore({
  reducer: {
    strategyItem: strategyItemReducer,
    strategies: strategiesReducer,
    prices: priceProviderReducer,
  },
});
