import IStrategyRepository from "../interfaces/IStrategyRepository";
import StrategyApr, {
  convertStrategyAprDtoToModel,
} from "../models/StrategyApr";
import StrategySummary, {
  convertStrategySummaryDtoToModel,
} from "../models/StrategySummary";
import Strategy, { convertStrategyDtoToModel } from "../models/Strategy";
import StrategyDto from "../dtos/StrategyDto";
import StrategyAprDto from "../dtos/StrategyAprDto";
import StrategySummaryDto from "../dtos/StrategySummaryDto";

class StrategyRepository implements IStrategyRepository {
  getStrategies(): Promise<Strategy[]> {
    const networkData: StrategyDto[] = [
      {
        deposit_amount: "110",
        deposit_currency: "NEAR",
        name: "REF-wNEAR",
        profits: [
          {
            amount: "10",
            currency: "REF",
          },
        ],
        status: "active", // in_progress, coming_soon
        type: "staking", // farming
      },
    ];

    return new Promise(resolve =>
      setTimeout(
        () => resolve(networkData.map(convertStrategyDtoToModel)),
        500,
      ),
    );
  }

  getStrategiesApr(): Promise<StrategyApr[]> {
    const networkData: StrategyAprDto[] = [
      {
        apr: "0.11", // in %
        name: "metapool",
        type: "staking",
      },
      {
        apr: "0.45", // in %
        name: "REF-wNEAR",
        type: "farming",
      },
    ];

    return new Promise(resolve =>
      setTimeout(
        () => resolve(networkData.map(convertStrategyAprDtoToModel)),
        800,
      ),
    );
  }

  getSummary(): Promise<StrategySummary> {
    const networkData: StrategySummaryDto = {
      avg_apr: "0.34", // in percents
      total_deposit_amount: "123200", // in USD
      total_profit_amount: "55", // in USD
    };

    return new Promise(resolve =>
      setTimeout(
        () => resolve(convertStrategySummaryDtoToModel(networkData)),
        150,
      ),
    );
  }
}

export const strategyRepository = (): IStrategyRepository =>
  new StrategyRepository();
