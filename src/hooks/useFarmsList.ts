import { useCallback, useEffect, useState } from "react";
import { fetchFarmList } from "../api/RefAPI";
import config from "../config";
import { toPrecision } from "../utils/RefApiUtils";

export type TokenName = "REF" | "NEAR" | "USDT";
export type FarmStatus = "in-progress" | "active" | "soon";

interface Farm {
  id: number;
  apr: string;
  pair: { first: TokenName; second: TokenName };
  status: FarmStatus;
}

interface Options {
  farms: Farm[];
}

export default function useFarmsList(): Options {
  const [farms, setFarms] = useState<Farm[]>([]);

  const formatFarmData = useCallback((rawFarm): Farm => {
    console.log(rawFarm);
    const activeFarms = config.activeFarms;
    
    let status: FarmStatus = "soon";
    if (activeFarms.includes(rawFarm.farm_id)) {
      status = "active";
    } else {
      status = "soon";
    }

    return {
      apr: rawFarm.apr,
      id: rawFarm.farm_id,
      pair: {
        first: rawFarm.pool.token_symbols[0].split('-')[0].replace("w", "").toUpperCase(),
        second: rawFarm.pool.token_symbols[1].split('-')[0].replace("w", "").toUpperCase(),
      },
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

const sortByStatus = (farms: Farm[]): Farm[] => {
  return farms.sort((a,b) => {
    if (a.status === "active") {
      return -1;
    } 
    return 1;
  });
}
