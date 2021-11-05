import Decimal from "decimal.js";
import { nearAPITestnet } from "../../api/NearAPI";
import config from "../../config";

const NEAR_NOMINATION_EXP = 24; // todo get from lib

const view = ({ methodName, args = {} }) =>
  nearAPITestnet.connection.provider
    .query({
      account_id: config.refFinanceContractId,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "final",
      method_name: methodName,
      request_type: "call_function",
    })
    .then(({ result }) => JSON.parse(Buffer.from(result).toString()));

// const NEAR_USDT_POOL_ID = 4;
const NEAR_USDT_POOL_ID = 7;
export async function fetchPricesFromREF() {
  const res = await view({
    args: { pool_id: NEAR_USDT_POOL_ID },
    methodName: "get_pool",
  });
  const usdtAmount = new Decimal(res.amounts[0]).div(Decimal.pow(10, 6));
  const nearAmount = new Decimal(res.amounts[1]).div(
    Decimal.pow(10, NEAR_NOMINATION_EXP),
  );

  const nearPrice = usdtAmount.div(nearAmount);
  // todo calculate fee
  return new Decimal(nearPrice.toFixed(10));
}
