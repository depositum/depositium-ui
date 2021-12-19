import { createAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../../types/FeatureKey";
import Strategy from "../../../models/Strategy";
import StrategyApr from "../../../models/StrategyApr";
import StrategySummary from "../../../models/StrategySummary";
import { StrategyState } from "./state";

export const updateStrategyState = createAction(
  `${FeatureKey.Strategy}/updateStrategyState`,
  (data: StrategyState) => ({
    payload: data,
  }),
);

export const updateStrategies = createAction(
  `${FeatureKey.Strategy}/updateStrategies`,
  (data: Strategy[]) => ({
    payload: data,
  }),
);

export const updateStrategiesApr = createAction(
  `${FeatureKey.Strategy}/updateStrategiesApr`,
  (data: StrategyApr[]) => ({
    payload: data,
  }),
);

export const updateSummary = createAction(
  `${FeatureKey.Strategy}/updateSummary`,
  (data: StrategySummary) => ({
    payload: data,
  }),
);
