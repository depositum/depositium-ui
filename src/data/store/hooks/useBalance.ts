import { useAppSelector } from "../store";
import { balanceSelector } from "../reducers/Balance/selector";
import { BalanceState } from "../reducers/Balance/state";

export default function (): BalanceState {
  const stata = useAppSelector(balanceSelector);

  return { ...stata };
}
