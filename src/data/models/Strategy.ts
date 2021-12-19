import Currency from "./Currency";
import Profit from "./Profit";
import StrategyDto from "../dtos/StrategyDto";

type StrategyName = string;

type StrategyStatus = "active" | "in_progress" | "coming_soon";

type StrategyType = "staking" | "farming";

interface Deposit {
  currency: Currency;
  amount: string;
}

export default interface Strategy {
  status: StrategyStatus;
  type: StrategyType;
  name: StrategyName;
  deposit: Deposit;
  profits: Profit[];
}

export function convertStrategyDtoToModel(dto: StrategyDto): Strategy {
  return {
    deposit: {
      amount: dto.deposit_amount,
      currency: dto.deposit_currency,
    },
    name: dto.name,
    profits: dto.profits,
    status: dto.status,
    type: dto.type,
  };
}
