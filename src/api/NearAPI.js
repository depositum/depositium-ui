import { keyStores, Near, utils } from "near-api-js";
import { ftGetStorageBalance, executeMultipleTransactions } from "./token";
import config from "../config";
import { wallet } from "./token";
export const ONE_YOCTO_NEAR = "0.000000000000000000000001";
export const NEW_ACCOUNT_STORAGE_COST = "0.00125";

const configTestnet = {
  explorerUrl: "https://explorer.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
};

const configMainnet = {
  explorerUrl: "https://explorer.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
};

export const nearAPITestnet = new Near({
  keyStore: new keyStores.InMemoryKeyStore(),
  ...configTestnet,
});

export const nearAPIMainnet = new Near({
  keyStore: new keyStores.InMemoryKeyStore(),
  ...configMainnet,
});

export const wrapNear = async amount => {
  const transactions = [];

  const actions = [];
  const balance = await ftGetStorageBalance(config.wrapNearContractId);

  if (!balance || balance.total === "0") {
    actions.push({
      amount: NEW_ACCOUNT_STORAGE_COST,
      args: {},
      gas: "30000000000000",
      methodName: "storage_deposit",
    });
  }

  actions.push({
    amount,
    args: {},
    gas: "50000000000000",
    methodName: "near_deposit",
  });

  actions.push({
    amount: ONE_YOCTO_NEAR,
    args: {
      amount: utils.format.parseNearAmount(amount),
      msg: "",
      receiver_id: config.depositiumContractId,
    },
    gas: "50000000000000",
    methodName: "ft_transfer_call",
  });

  transactions.push({
    functionCalls: actions,
    receiverId: config.wrapNearContractId,
  });

  return executeMultipleTransactions(transactions);
};

export const createSubAccount = async amount => {
  const transactions = [];

  const actions = [];

  const accoundId = wallet.getAccountId();
  const accoundPrefix = accoundId.split(".")[0];
  actions.push({
    amount: "3",
    args: {
      accound_sub_id: accoundPrefix,
      amount: utils.format.parseNearAmount(amount),
    },
    gas: "300000000000000",
    methodName: "create",
  });

  const initTx = {
    functionCalls: [
      {
        args: {},
        gas: "300000000000000",
        methodName: "init",
      },
    ],
    receiverId: `${accoundPrefix}.${config.depositiumContractId}`,
  };

  transactions.push({
    functionCalls: actions,
    receiverId: config.depositiumContractId,
  });
  transactions.push(initTx);

  return executeMultipleTransactions(transactions);
};

export const startStrategy = async amount => {
  const transactions = [];

  const actions = [];

  const accoundId = wallet.getAccountId();
  const accoundPrefix = accoundId.split(".")[0];
  actions.push({
    args: {
      amount: utils.format.parseNearAmount(amount),
      token: "wrap_near-aromankov.testnet",
    },
    gas: "300000000000000",
    methodName: "supply",
  });

  transactions.push({
    functionCalls: actions,
    receiverId: `${accoundPrefix}.${config.depositiumContractId}`,
  });

  return executeMultipleTransactions(transactions);
};

export const fetchFiatRate = async () =>
  fetch(process.env.REACT_APP_ACCOUNT_HELPER_URL + "/fiat", {
    headers: { "Content-type": "application/json; charset=UTF-8" },
    method: "GET",
  })
    .then(res => res.json())
    .catch(() => ({
      near: {
        cny: 66.36,
        eur: 8.98,
        last_updated_at: 1636159198,
        usd: 10.37,
      },
    }));
