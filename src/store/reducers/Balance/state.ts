/**
 * Balance state
 */
export interface BalanceState {
  balance: number;
  rate: number;
}

/**
 * Initial state
 */
export const initialBalanceState: BalanceState = {
  balance: 0,
  rate: 0,
};
