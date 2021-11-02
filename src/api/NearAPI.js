import { keyStores, Near, utils } from "near-api-js";
import { ftGetStorageBalance, executeMultipleTransactions } from './token';
import config from '../config';

export const ONE_YOCTO_NEAR = '0.000000000000000000000001';
export const NEW_ACCOUNT_STORAGE_COST = '0.00125';


const configTestnet = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
};

const configMainnet = {
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
};

export const nearAPITestnet = new Near({
    keyStore: new keyStores.InMemoryKeyStore(),
    ...configTestnet,
});

export const nearAPIMainnet = new Near({
    keyStore: new keyStores.InMemoryKeyStore(),
    ...configMainnet,
});

export const wrapNear = async (amount) => {
    const transactions = [];

    const actions = [];
    const balance = await ftGetStorageBalance(config.wrapNearContractId);

    if (!balance || balance.total === '0') {
        actions.push({
            methodName: 'storage_deposit',
            args: {},
            gas: '30000000000000',
            amount: NEW_ACCOUNT_STORAGE_COST,
        });
    }

    actions.push({
        methodName: 'near_deposit',
        args: {},
        gas: '50000000000000',
        amount,
    });

    actions.push({
        methodName: 'ft_transfer_call',
        args: {
            receiver_id: config.depositiumContractId,
            amount: utils.format.parseNearAmount(amount),
            msg: '',
        },
        gas: '50000000000000',
        amount: ONE_YOCTO_NEAR,
    });

    transactions.push({
        receiverId: config.wrapNearContractId,
        functionCalls: actions,
    });

    return executeMultipleTransactions(transactions);
};
