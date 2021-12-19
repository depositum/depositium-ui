import { createAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../../types/FeatureKey";
import CurrenciesAmount from "../../../models/CurrenciesAmount";
import Currency from "../../../models/Currency";
import { BalanceState } from "./state";

export const updateBalanceState = createAction(
  `${FeatureKey.Balance}/updateBalanceState`,
  (data: BalanceState) => ({
    payload: data,
  }),
);

export const updateBalances = createAction(
  `${FeatureKey.Balance}/updateBalances`,
  (data: CurrenciesAmount) => ({
    payload: data,
  }),
);

export const updateCurrencies = createAction(
  `${FeatureKey.Balance}/updateCurrencies`,
  (data: Currency[]) => ({
    payload: data,
  }),
);

export const updatePrices = createAction(
  `${FeatureKey.Balance}/updatePrices`,
  (data: CurrenciesAmount) => ({
    payload: data,
  }),
);
