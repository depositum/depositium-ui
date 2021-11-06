import { useEffect, useState } from "react";
import { fetchAccountBalance } from "../features/providers/contractAPI";
import { fetchFiatRate } from "../api/NearAPI";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Decimal from "decimal.js";

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

      const rate = await fetchFiatRate();
      setRate(rate.near.usd);
      setFiatAmount(new Decimal(rate.near.usd).times(balance).toFixed(2));
    }
    fetchBalanceAndRate();
  }, []);

  return { balance, fiatAmount, rate };
}
