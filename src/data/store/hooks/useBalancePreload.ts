import { PreloadState, usePreloadReducer } from "../types/PreloadReducer";
import { useCallback } from "react";
import { useAppDispatch } from "../store";
import { balanceRepository } from "../../repositories/BalanceRepository";
import { updateBalanceState } from "../reducers/Balance/action";

interface Result {
  preloadState: PreloadState;
  preloadBalance: () => void;
}

export default function (): Result {
  const [preloadState, preloadDispatch] = usePreloadReducer();
  const dispatch = useAppDispatch();

  const onPreload = useCallback(() => {
    // Dispatch loading state
    preloadDispatch({ type: "loading" });

    // Start preloading
    Promise.all([
      balanceRepository().getBalances(),
      balanceRepository().getPrices(),
      balanceRepository().getCurrencies(),
    ])
      .then(values => {
        // Dispatch response to store
        dispatch(
          updateBalanceState({
            balances: values[0],
            currencies: values[2],
            prices: values[1],
          }),
        );

        // Dispatch success result
        preloadDispatch({ type: "success" });
      })
      .catch(() => {
        // Dispatch error
        preloadDispatch({ message: "Something went wrong", type: "error" });
      });
  }, [dispatch, preloadDispatch]);

  return { preloadBalance: onPreload, preloadState: preloadState };
}
