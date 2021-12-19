import Strategy from "../models/Strategy";
import StrategySummary from "../models/StrategySummary";
import StrategyApr from "../models/StrategyApr";

export default interface IStrategyRepository {
  getStrategies(): Promise<Strategy[]>;

  getSummary(): Promise<StrategySummary>;

  getStrategiesApr(): Promise<StrategyApr[]>;
}
