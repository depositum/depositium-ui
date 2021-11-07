import { getFarmInfo, getLPTokenId, parsePoolView } from "../utils/RefApiUtils";
import {
  getFarms,
  getPools,
  getRewardsByAccountId,
  getSeeds,
  getStakedListByAccountId,
} from "../contract/RefContractView";
import walletAPI from "./WalletAPI";
import config from "../config";

// const allowedFarms = ["v2.ref-finance.near@79#0"];
const allowedFarms = config.availableFarms;

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
  // const tokenPriceList = await fetchTokenPriceList();
  const tokenPriceList = {};

  const filteredFarms = farmList.filter(f => allowedFarms.includes(f.farm_id));
  const poolIds = filteredFarms.map(it => getLPTokenId(it.farm_id));

  let poolList = {};
  const pools = await getPools();
  if (pools) {
    for (let poolId = 0; poolId < pools.length; poolId++) {
      poolList[`${config.financeContractId}@${poolId}#0`] = { 
        shares_total_supply: pools[poolId].shares_total_supply,
        token_symbols: pools[poolId].token_account_ids 
      };
    }
  }

  return filteredFarms.map(f => {
    return getFarmInfo(
      f,
      poolList[f.farm_id],
      stakedList[f.seed_id],
      tokenPriceList,
      rewardList[f.reward_token],
      seeds[f.seed_id],
      getLPTokenId(f.farm_id),
    );
  });
};
