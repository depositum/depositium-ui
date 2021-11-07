import { TokenName } from "./useFarmsList";
import { useState } from "react";

export interface IStake {
  _type: "stake";
  provider: string;
  id: number;
  apr: string;
  token: TokenName;
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
      provider: "Metapool",
      token: "stNEAR",
    },
  ]);

  return { stakes };
}
