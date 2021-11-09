import { useEffect, useState } from "react";
import { fetchAccountBalance } from "../features/providers/contractAPI";
import { fetchFiatRate } from "../api/NearAPI";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Decimal from "decimal.js";
import { store } from "../store";
import { updateBalance, updateRate } from "../store/reducers/Balance/action";

interface Options {
  balance: string;
  rate: string;
  fiatAmount: string;
}

export default function useNearBalance(): Options {
  const [balance, setBalance] = useState<string>("~");
  const [rate, setRate] = useState<string>("~");
  const [fiatAmount, setFiatAmount] = useState<string>("~");

  // Preloading and set near balance, rate and fiat amount
  useEffect(() => {
    async function fetchBalanceAndRate() {
      const balance = await fetchAccountBalance();
      setBalance(balance);

      // Update balance on the store
      store.dispatch(updateBalance(Number(balance) ?? 0));

      // Fetch rate
      const rate = await fetchFiatRate();
      setRate(rate.near.usd);
      setFiatAmount(new Decimal(rate.near.usd).times(balance).toFixed(2));

      // Update rate on the store
      store.dispatch(updateRate(rate.near.usd));
    }
    fetchBalanceAndRate();
  }, []);

  return { balance, fiatAmount, rate };
}
