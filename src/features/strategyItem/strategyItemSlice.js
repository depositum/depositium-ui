import { createSlice } from "@reduxjs/toolkit";
import Decimal from "decimal.js";
import { startStrategy as startStrategyApiCall } from "../../api/NearAPI";

const initialState = {
  f_ref_near: {
    apr: 54.3,
    days: 30,
    depositAmount: "",
    depositAmountUSD: 0,
    profit: 0,
    profitUSD: 0,
  },
  f_usdt_near: {
    apr: 94.3,
    days: 30,
    depositAmount: "",
    depositAmountUSD: 0,
    profit: 0,
    profitUSD: 0,
  },
};

const calculateProfit = (apr, days, depositAmount) => {
  if (!apr || !days || !depositAmount) {
    return "0";
  }

  try {
    new Decimal(depositAmount);
  } catch (err) {
    return "0";
  }

  const interestPerDay = new Decimal(apr).div(100).div("365");
  const res = interestPerDay.times(days).times(depositAmount);
  return res.toFixed(2);
};

export const strategyItemSlice = createSlice({
  initialState,
  name: "strategyItem",
  reducers: {
    changeDays: (state, action) => {
      const { value, strategyId } = action.payload;
      const strategy = state[strategyId];
      strategy.days = value;
      strategy.profit = calculateProfit(
        strategy.apr,
        strategy.days,
        strategy.depositAmount,
      );
    },
    changeDepositAmount: (state, action) => {
      const { value, strategyId } = action.payload;
      const strategy = state[strategyId];
      strategy.depositAmount = value;
      strategy.profit = calculateProfit(
        strategy.apr,
        strategy.days,
        strategy.depositAmount,
      );
    },
    startStrategy: (state, action) => {
      const { strategyId } = action.payload;
      console.log("start strategy", strategyId);
      startStrategyApiCall("12")
        .then(res => {
          console.log("start strategy res:", res);
        })
        .catch(err => console.log("startStrategy err", err));
    },
  },
});

export const { changeDepositAmount, changeDays, startStrategy } =
  strategyItemSlice.actions;

export const selectStrategyItem = (state, strategyId) =>
  state.strategyItem[strategyId];

export const selectDepositAmount = state => state.strategyItem.depositAmount;
export const selectProfit = state => state.strategyItem.profit;
export const selectDays = state => state.strategyItem.days;

export default strategyItemSlice.reducer;
