import { BalanceState } from "./state";
import { StoreState } from "../../store";

/**
 * Balance selector
 * @param state BalanceState
 */
export const balanceSelector = (state: StoreState): BalanceState =>
  state.balance;
