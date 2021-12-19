import { StrategyState } from "./state";
import { StoreState } from "../../store";

/**
 * Strategy selector
 * @param state StrategyState
 */
export const strategySelector = (state: StoreState): StrategyState =>
  state.strategy;
