import { PreloadState, usePreloadReducer } from "../types/PreloadReducer";
import { useCallback } from "react";
import { strategyRepository } from "../../repositories/StrategyRepository";
import { useAppDispatch } from "../store";
import { updateStrategyState } from "../reducers/Strategy/action";

interface Result {
  preloadState: PreloadState;
  preloadStrategy: () => void;
}

export default function (): Result {
  const [preloadState, preloadDispatch] = usePreloadReducer();
  const dispatch = useAppDispatch();

  const onPreload = useCallback(() => {
    // Dispatch loading state
    preloadDispatch({ type: "loading" });

    // Start preloading
    Promise.all([
      strategyRepository().getStrategies(),
      strategyRepository().getStrategiesApr(),
      strategyRepository().getSummary(),
    ])
      .then(values => {
        // Dispatch response to store
        dispatch(
          updateStrategyState({
            strategies: values[0],
            strategiesApr: values[1],
            summary: values[2],
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

  return { preloadState: preloadState, preloadStrategy: onPreload };
}
