import Decimal from "decimal.js";
import { nearAPITestnet, nearAPIMainnet } from "../../api/NearAPI";
import config from "../../config";
import walletAPI from "../../api/WalletAPI";

const NEAR_NOMINATION_EXP = 24; // todo get from lib

const view = ({ contractId, methodName, args = {} }) => {
  let nearAPI = nearAPITestnet;

  if (contractId === config.refFinanceContractId) {
    nearAPI = nearAPIMainnet;
  }

  return nearAPI.connection.provider
    .query({
      account_id: contractId,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "final",
      method_name: methodName,
      request_type: "call_function",
    })
    .then(({ result }) => JSON.parse(Buffer.from(result).toString()));
};

const NEAR_USDT_POOL_ID = 4;
export async function fetchPricesFromREF() {
  const res = await view({
    args: { pool_id: NEAR_USDT_POOL_ID },
    contractId: config.refFinanceContractId,
    methodName: "get_pool",
  });
  const usdtAmount = new Decimal(res.amounts[0]).div(Decimal.pow(10, 6));
  const nearAmount = new Decimal(res.amounts[1]).div(
    Decimal.pow(10, NEAR_NOMINATION_EXP),
  );

  const nearPrice = usdtAmount.div(nearAmount);
  // todo calculate fee
  return nearPrice.toFixed(10);
}

export async function fetchAccountBalance() {
  console.log("fetch balance from contract", config.depositiumContractId);
  const acc = await walletAPI.account();
  const res = await view({
    args: { account_id: acc.accountId },
    contractId: config.depositiumContractId,
    methodName: "balance_of",
  });
  const balances = {};
  console.log("balances res", res);

  for (const [token, balance] of res) {
    balances[token] = new Decimal(balance).div(Decimal.pow(10, 24)).toString();
  }

  console.log("balances", balances);

  return balances["wrap_near-aromankov.testnet"] ?? 0;
}
