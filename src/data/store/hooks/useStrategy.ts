import { useAppSelector } from "../store";
import { strategySelector } from "../reducers/Strategy/selector";
import { StrategyState } from "../reducers/Strategy/state";

export default function (): StrategyState {
  const stata = useAppSelector(strategySelector);

  return { ...stata };
}
