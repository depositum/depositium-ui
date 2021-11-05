import { nearAPITestnet } from "../api/NearAPI";
import walletAPI from "../api/WalletAPI";
import config from "../config";

const view = (
  { methodName, args = {} },
  accountId = config.refFarmingContractId,
) =>
  nearAPITestnet.connection.provider
    .query({
      account_id: accountId,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "final",
      method_name: methodName,
      request_type: "call_function",
    })
    .then(({ result }) => JSON.parse(Buffer.from(result).toString()));

export const getSeeds = async () =>
  await view({
    args: { from_index: 0, limit: 100 },
    methodName: "list_seeds",
  });

export const getFarms = async () =>
  await view({
    args: { from_index: 0, limit: 100 },
    methodName: "list_farms",
  });

export const getRewardsByAccountId = async ({
  accountId = walletAPI.getAccountId(),
}) =>
  view({
    args: { account_id: accountId },
    methodName: "list_rewards",
  });

export const getStakedListByAccountId = async ({
  accountId = walletAPI.getAccountId(),
}) =>
  await view({
    args: { account_id: accountId },
    methodName: "list_user_seeds",
  });
