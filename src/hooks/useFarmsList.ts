import { useCallback, useEffect, useState } from "react";
import { fetchFarmList } from "../api/RefAPI";
import { toPrecision } from "../utils/RefApiUtils";

export type TokenName = "REF" | "NEAR" | "USDT";

interface Farm {
  id: number;
  apr: string;
  pair: { first: TokenName; second: TokenName };
}

interface Options {
  farms: Farm[];
}

export default function useFarmsList(): Options {
  const [farms, setFarms] = useState<Farm[]>([]);

  const formatFarmData = useCallback((rawFarm): Farm => {
    console.log(rawFarm);
    // Format APR
    const apr = toPrecision(rawFarm.apr.toString(), 2);

    return {
      apr: apr,
      id: rawFarm.farm_id,
      pair: {
        first: rawFarm.pool.token_symbols[0].replace("w", ""),
        second: rawFarm.pool.token_symbols[1].replace("w", ""),
      },
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
