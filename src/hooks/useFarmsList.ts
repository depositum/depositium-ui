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
      apr: "155.8",
      id: rawFarm.farm_id,
      pair: {
        first: rawFarm.pool.token_symbols[0].replace("w", ""),
        second: rawFarm.pool.token_symbols[1].replace("w", ""),
      },
      status: status,
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchFarmList();
      setFarms(response.map(formatFarmData));
    }
    if (farms.length === 0) {
      fetchData();
    }
  }, [farms, formatFarmData]);

  return { farms };
}
