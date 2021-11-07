import { FarmStatus, TokenName } from "./useFarmsList";
import { useState } from "react";

export interface IStake {
  _type: "stake";
  provider: string;
  id: number;
  apr: string;
  token: TokenName;
  status: FarmStatus;
}

interface Options {
  stakes: IStake[];
}

export default function useStakesList(): Options {
  const [stakes, setStakes] = useState<IStake[]>([
    {
      _type: "stake",
      apr: "10.5",
      id: 1,
      provider: "Staking",
      token: "Metapool stNEAR",
      status: "soon",
    },
    {
      _type: "stake",
      apr: "50.34",
      id: 2,
      provider: "REF Farming",
      token: "REF-NEAR",
      status: "soon",
    },
  ]);

  return { stakes };
}
