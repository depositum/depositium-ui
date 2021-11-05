import { getFarmInfo, getLPTokenId, parsePoolView } from "../utils/RefApiUtils";
import {
  getFarms,
  getRewardsByAccountId,
  getSeeds,
  getStakedListByAccountId,
} from "../contract/RefContractView";
import walletAPI from "./WalletAPI";

// const allowedFarms = ["v2.ref-finance.near@79#0"];
const allowedFarms = [
  "ref-finance-101.testnet@0#0",
  "ref-finance-101.testnet@14#0",
];

export const fetchPoolsByFarmIs = async poolIds => {
  const ids = poolIds.join("|");

  return fetch(
    process.env.REACT_APP_INDEXER_URL + "/list-pools-by-ids?ids=" + ids,
    {
      headers: { "Content-type": "application/json; charset=UTF-8" },
      method: "GET",
    },
  )
    .then(res => res.json())
    .then(pools => {
      pools = pools.map(pool => parsePoolView(pool));
      return pools;
    })
    .catch(() => []);
};

export const fetchTokenPriceList = async () =>
  await fetch(process.env.REACT_APP_INDEXER_URL + "/list-token-price", {
    headers: { "Content-type": "application/json; charset=UTF-8" },
    method: "GET",
  })
    .then(res => res.json())
    .catch(() => []);

export const fetchFarmList = async () => {
  const seeds = await getSeeds();
  const farmList = await getFarms();
  const rewardList = walletAPI.isSignedIn()
    ? await getRewardsByAccountId({})
    : {};
  const stakedList = walletAPI.isSignedIn()
    ? await getStakedListByAccountId({})
    : {};
  const tokenPriceList = await fetchTokenPriceList();

  const filteredFarms = farmList.filter(it =>
    allowedFarms.includes(it.farm_id),
  );
  const poolIds = filteredFarms.map(it => getLPTokenId(it.farm_id));

  let poolList = {};
  const pools = await fetchPoolsByFarmIs(poolIds);
  if (pools) {
    poolList = pools.reduce((obj, pool) => ({ ...obj, [pool.id]: pool }), {});
  }

  return filteredFarms.map(f => {
    const pool =
      Object.keys(poolList).length === 0
        ? {
            amounts: ["", ""],
            id: 0,
            share: "0",
            shares_total_supply: "0",
            token0_ref_price: "0",
            token_account_ids: ["", ""],
            token_symbols: ["", ""],
            total_fee: 0,
            tvl: 0,
          }
        : poolList[getLPTokenId(f.farm_id)];

    return getFarmInfo(
      f,
      pool,
      stakedList[f.seed_id],
      tokenPriceList,
      rewardList[f.reward_token],
      seeds[f.seed_id],
      getLPTokenId(f.farm_id),
    );
  });
};
