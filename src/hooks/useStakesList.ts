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
      status: "soon",
      token: "Metapool stNEAR",
    },
    {
      _type: "stake",
      apr: "50.34",
      id: 2,
      provider: "REF Farming",
      status: "soon",
      token: "REF-NEAR",
    },
  ]);

  return { stakes };
}
