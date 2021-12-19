import Strategy from "./Strategy";
import StrategyAprDto from "../dtos/StrategyAprDto";

export default interface StrategyApr {
  type: Strategy["type"];
  name: Strategy["name"];
  apr: number;
}

export function convertStrategyAprDtoToModel(dto: StrategyAprDto): StrategyApr {
  return {
    apr: Number(dto.apr),
    name: dto.name,
    type: dto.type,
  };
}
