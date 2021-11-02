import Decimal from 'decimal.js';
import { nearAPITestnet, nearAPIMainnet } from "../../api/NearAPI";
import config from '../../config';
import walletAPI from "../../api/WalletAPI";

const NEAR_NOMINATION_EXP = 24; // todo get from lib

const view = ({
    contractId,
    methodName,
    args = {},
}) => {
    let nearAPI = nearAPITestnet;

    if (contractId === config.refFinanceContractId) {
        nearAPI = nearAPIMainnet;
    }

    return nearAPI.connection.provider
        .query({
            request_type: 'call_function',
            finality: 'final',
            account_id: contractId,
            method_name: methodName,
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
        })
        .then(({ result }) => JSON.parse(Buffer.from(result).toString()));
};

const NEAR_USDT_POOL_ID = 4;
export async function fetchPricesFromREF() {
    const res = await view({ contractId: config.refFinanceContractId, methodName: 'get_pool', args: { pool_id: NEAR_USDT_POOL_ID } });
    const usdtAmount = new Decimal(res.amounts[0]).div(Decimal.pow(10, 6));
    const nearAmount = new Decimal(res.amounts[1]).div(Decimal.pow(10, NEAR_NOMINATION_EXP ));

    const nearPrice = usdtAmount.div(nearAmount);
    // todo calculate fee
    return nearPrice.toFixed(10);
}

export async function fetchAccountBalance() {
    console.log('fetch balance from contract', config.depositiumContractId);
    const acc = await walletAPI.account();
    const res = await view({ contractId: config.depositiumContractId, methodName: 'balance_of', args: { account_id: acc.accountId } });
    const balances = {};
    console.log('balances res', res);

    for (const [token, balance] of res) {
        balances[token] = new Decimal(balance).div(Decimal.pow(10, 24)).toString();
    }

    console.log('balances', balances);

    return balances;
}