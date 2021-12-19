import Strategy from "../../../models/Strategy";
import StrategyApr from "../../../models/StrategyApr";
import StrategySummary from "../../../models/StrategySummary";

/**
 * Strategy state
 */
export interface StrategyState {
  strategies: Strategy[];
  strategiesApr: StrategyApr[];
  summary: StrategySummary;
}

/**
 * Initial state
 */
export const initialStrategyState: StrategyState = {
  strategies: [],
  strategiesApr: [],
  summary: {
    avgApr: 0,
    totalDepositAmount: 0,
    totalProfitAmount: 0,
  },
};
