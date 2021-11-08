import * as math from "mathjs";
import { BigNumber } from "bignumber.js";
import walletAPI from "../api/WalletAPI";
import { getStrategyState } from "../contract/RefContractView";

const LP_TOKEN_DECIMALS = 24;

export function formatWithCommas(value) {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(value)) {
    value = value.replace(pattern, "$1,$2");
  }
  return value;
}

export const toPrecision = (
  number,
  precision,
  withCommas = false,
  atLeastOne = true,
) => {
  const [whole, decimal = ""] = number.split(".");

  let str = `${withCommas ? formatWithCommas(whole) : whole}.${decimal.slice(
    0,
    precision,
  )}`.replace(/\.$/, "");
  if (atLeastOne && Number(str) === 0 && str.length > 1) {
    const n = str.lastIndexOf("0");
    str = str.slice(0, n) + str.slice(n).replace("0", "1");
  }

  return str;
};

export const formatApr = value => new BigNumber(value);

export const toReadableNumber = (decimals, number = "0") => {
  if (!decimals) return number;

  const wholeStr = number.substring(0, number.length - decimals) || "0";
  const fractionStr = number
    .substring(number.length - decimals)
    .padStart(decimals, "0")
    .substring(0, decimals);

  return `${wholeStr}.${fractionStr}`.replace(/\.?0+$/, "");
};

export const parsePoolView = pool => ({
  amounts: pool.amounts,
  id: Number(pool.id),
  share: pool.share,
  shares_total_supply: pool.shares_total_supply,
  token0_ref_price: pool.token0_ref_price,
  token_account_ids: pool.token_account_ids,
  token_symbols: pool.token_symbols,
  total_fee: pool.total_fee,
  tvl: Number(toPrecision(pool.tvl, 2)),
});

export const getLPTokenId = farm_id =>
  farm_id.slice(farm_id.indexOf("@") + 1, farm_id.lastIndexOf("#"));

export const getFarmInfo = async (
  farm,
  pool,
  staked,
  tokenPriceList,
  reward,
  seed,
  lpTokenId,
) => {
  const tvl = '0.00000000000000000001';
  const poolTvl = tvl;
  const poolSts = Number(toReadableNumber(24, pool.shares_total_supply));
  const userStaked = toReadableNumber(LP_TOKEN_DECIMALS, staked ?? "0");
  const fakeTokenPriceList = { 'usdc-aromankov.testnet': { price: 1 } };
  const rewardToken = fakeTokenPriceList[farm.reward_token];
  const rewardTokenPrice = rewardToken ? rewardToken.price || 0 : 0;
  const rewardNumber = toReadableNumber(rewardToken.decimals, reward) ?? "0";
  const seedAmount = seed ?? "0";
  const totalSeed = toReadableNumber(LP_TOKEN_DECIMALS, seedAmount);

  const rewardNumberPerWeek = math.round(
    math.evaluate(
      `(${farm.reward_per_session} / ${farm.session_interval}) * 604800`,
    ),
  );

  const rewardsPerWeek = toPrecision(
    toReadableNumber(
      rewardToken.decimals,
      new BigNumber(rewardNumberPerWeek.toString()).toFixed(),
    ),
    2,
  );

  const userRewardNumberPerWeek =
    seedAmount !== "0"
      ? math.round(
        math.evaluate(
          `${rewardNumberPerWeek} * (${staked ?? 0} / ${seedAmount})`,
        ),
      )
      : 0;

  const userRewardsPerWeek = toReadableNumber(
    rewardToken.decimals,
    userRewardNumberPerWeek.toString(),
  );

  const totalStaked = new BigNumber(totalSeed).multipliedBy(poolTvl).dividedBy(poolSts).toNumber();

  let apr =
    totalStaked === 0
      ? "0"
      : new BigNumber(1)
        .dividedBy(totalStaked)
        .multipliedBy(
          new BigNumber(rewardsPerWeek).multipliedBy(rewardTokenPrice)
        )
        .multipliedBy(52)
        .multipliedBy(100)
        .toFixed()

  apr = '54.43';
  if (farm.farm_status === "Created") farm.farm_status = "Pending";

  try {
    const strategyState = walletAPI.isSignedIn() ? await getStrategyState({ farmId: farm.farm_id }) : 0
    if (strategyState > 0) {
      farm.farm_status = "InProgress";
    }
  } catch (e) {
    console.log(e);
  }

  return {
    ...farm,
    apr,
    lpTokenId,
    pool,
    rewardNumber,
    rewardToken,
    rewardsPerWeek,
    totalStaked,
    userRewardsPerWeek,
    userStaked,
  };
};
