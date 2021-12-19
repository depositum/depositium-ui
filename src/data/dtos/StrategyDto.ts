import CurrencyDto from "./CurrencyDto";
import ProfitDto from "./ProfitDto";

type StrategyDtoName = string;

type StrategyDtoStatus = "active" | "in_progress" | "coming_soon";

type StrategyDtoType = "staking" | "farming";

export default interface StrategyDto {
  status: StrategyDtoStatus;
  type: StrategyDtoType;
  name: StrategyDtoName;
  deposit_currency: CurrencyDto;
  deposit_amount: string;
  profits: ProfitDto[];
}
