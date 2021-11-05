import { useCallback, useEffect, useState } from "react";
import { fetchFarmList } from "../api/RefAPI";
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
    // Format APR
    const apr = Number(toPrecision(rawFarm.apr.toString(), 2)).toPrecision(2);

    // Parse status
    let status: FarmStatus;
    switch (rawFarm.farm_status) {
      case "Pending":
        status = "soon";
        break;
      case "Ended":
        status = "in-progress";
        break;
      default:
        status = "active";
    }

    return {
      apr: apr,
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
