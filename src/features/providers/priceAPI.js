import { keyStores, Near } from 'near-api-js';
import Decimal from 'decimal.js';

const NEAR_NOMINATION_EXP = 24; // todo get from lib

const config = {
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
    indexerUrl: 'https://mainnet-indexer.ref-finance.com',
};
const near = new Near({
    keyStore: new keyStores.InMemoryKeyStore(),
    ...config,
});

const view = ({
    methodName,
    args = {},
}) => {
    return near.connection.provider
        .query({
            request_type: 'call_function',
            finality: 'final',
            account_id: 'v2.ref-finance.near',
            method_name: methodName,
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
        })
        .then(({ result }) => JSON.parse(Buffer.from(result).toString()));
};

const NEAR_USDT_POOL_ID = 4;
export async function fetchPricesFromREF() {
    const res = await view({ methodName: 'get_pool', args: { pool_id: NEAR_USDT_POOL_ID } });
    const usdtAmount = new Decimal(res.amounts[0]).div(Decimal.pow(10, 6));
    const nearAmount = new Decimal(res.amounts[1]).div(Decimal.pow(10, NEAR_NOMINATION_EXP ));

    const nearPrice = usdtAmount.div(nearAmount);
    // todo calculate fee
    return nearPrice.toFixed(10);
}