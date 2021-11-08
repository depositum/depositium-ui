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
import { wallet } from "./token";
import { BigNumber } from "bignumber.js";
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

  const accoundId = wallet.getAccountId();
  const accoundPrefix = accoundId.split(".")[0];
  const subAccId = `${accoundPrefix}.${config.depositiumContractId}`;

  const rewardList = walletAPI.isSignedIn()
    ? await getRewardsByAccountId({ accountId: subAccId })
    : {};


  const stakedList = walletAPI.isSignedIn()
    ? await getStakedListByAccountId({ accountId: subAccId })
    : {};
  // const tokenPriceList = await fetchTokenPriceList();
  const tokenPriceList = {
    'usdc-aromankov.testnet': 1,
    'wrap_near-aromankov.testnet': 10.6,
  };

  const filteredFarms = farmList.filter(f => allowedFarms.includes(f.farm_id));
  const poolIds = filteredFarms.map(it => getLPTokenId(it.farm_id));

  let poolList = {};
  const pools = await getPools();
  if (pools) {
    for (let poolId = 0; poolId < pools.length; poolId++) {
      const token0 = pools[poolId].token_account_ids[0];
      const token1 = pools[poolId].token_account_ids[1];
      const token0Tvl = new BigNumber(pools[poolId].amounts[0])
        .dividedBy(new BigNumber(10).pow(18))
        .multipliedBy(tokenPriceList[token0]);
      const token1Tvl = new BigNumber(pools[poolId].amounts[1])
        .dividedBy(new BigNumber(10).pow(24))
        .multipliedBy(tokenPriceList[token1]);
      poolList[`${config.financeContractId}@${poolId}#1`] = {
        shares_total_supply: pools[poolId].shares_total_supply,
        token_symbols: pools[poolId].token_account_ids,
        tvl: token0Tvl.plus(token1Tvl).toFixed(0),
      };
    }
  }

  let farmsInfo = [];
  for (const farm of filteredFarms) {
    farmsInfo.push(
      await getFarmInfo(
        farm,
        poolList[farm.farm_id],
        stakedList[farm.seed_id],
        tokenPriceList,
        rewardList[farm.reward_token],
        seeds[farm.seed_id],
        getLPTokenId(farm.farm_id),
      ),
    );
  }
  return farmsInfo;
};
