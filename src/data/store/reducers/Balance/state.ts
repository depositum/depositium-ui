import CurrenciesAmount from "../../../models/CurrenciesAmount";
import Currency from "../../../models/Currency";

/**
 * Balance state
 */
export interface BalanceState {
  balances: CurrenciesAmount;
  currencies: Currency[];
  prices: CurrenciesAmount;
}

/**
 * Initial state
 */
export const initialBalanceState: BalanceState = {
  balances: {
    NEAR: "0",
    REF: "0",
  },
  currencies: [],
  prices: {
    NEAR: "0",
    REF: "0",
  },
};
