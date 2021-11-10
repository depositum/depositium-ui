import { useCallback, useEffect, useState } from "react";
import { fetchFarmList } from "../api/RefAPI";
import config from "../config";
import { fetchFiatRate } from "../api/NearAPI";
import { store } from "../store";
import { updateRate } from "../store/reducers/Balance/action";

export type TokenName =
  | "REF"
  | "NEAR"
  | "USDT"
  | "stNEAR"
  | "REF-NEAR"
  | "Metapool stNEAR"
  | "USDC";
export type FarmStatus = "in-progress" | "active" | "soon";

export interface IFarm {
  _type: "farm";
  provider: string;
  id: number;
  apr: string;
  pair: { first: TokenName; second: TokenName };
  depositAmount: string;
  profitAmount: string;
  status: FarmStatus;
}

interface Options {
  farms: IFarm[];
}

export default function useFarmsList(): Options {
  const [farms, setFarms] = useState<IFarm[]>([]);

  const formatFarmData = useCallback((rawFarm): IFarm => {
    console.log(rawFarm);
    const activeFarms = config.activeFarms;

    let status: FarmStatus;
    if (rawFarm.strategyInProgress) {
      status = "in-progress";
    } else if (activeFarms.includes(rawFarm.farm_id)) {
      status = "active";
    } else {
      status = "soon";
    }

    return {
      _type: "farm",
      apr: rawFarm.apr,
      depositAmount: rawFarm.strategyInitialDeposit || '0',
      id: rawFarm.farm_id,
      pair: {
        first: rawFarm.pool.token_symbols[0]
          .split("-")[0]
          .replace("wrap_", "")
          .toUpperCase(),
        second: rawFarm.pool.token_symbols[1]
          .split("-")[0]
          .replace("wrap_", "")
          .toUpperCase(),
      },
      profitAmount: rawFarm.unclaimedReward,
      provider: "REF Farming",
      status: status,
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      // TODO: Workaround for not authorized users to fix calculating on the modals
      const rate = await fetchFiatRate();
      store.dispatch(updateRate(rate.near.usd));

      // Fetch farms
      const response = await fetchFarmList();
      setFarms(sortByStatus(response.map(formatFarmData)));
    }
    if (farms.length === 0) {
      fetchData();
    }
  }, [farms, formatFarmData]);

  return { farms };
}

const sortByStatus = (farms: IFarm[]): IFarm[] =>
  farms.sort((a, b) => {
    if (a.status === "active") {
      return -1;
    }
    return 1;
  });
