import { useCallback, useEffect, useState } from "react";
import { fetchFarmList } from "../api/RefAPI";
import config from "../config";

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
  depositAmount: number;
  profitAmount: number;
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
      depositAmount: 15,
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
