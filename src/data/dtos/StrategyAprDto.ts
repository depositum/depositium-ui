import StrategyDto from "./StrategyDto";

export default interface StrategyAprDto {
  type: StrategyDto["type"];
  name: StrategyDto["name"];
  apr: string;
}
