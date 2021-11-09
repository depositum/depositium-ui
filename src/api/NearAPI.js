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

export const startStrategy = async amount => {
  const transactions = [];

  console.log("startStrategy", amount);
  const accoundId = wallet.getAccountId();
  const accoundPrefix = accoundId.split(".")[0];
  const subAccId = `${accoundPrefix}.${config.depositiumContractId}`;

  transactions.push({
    functionCalls: [
      {
        amount: "4",
        args: {
          accound_sub_id: accoundPrefix,
        },
        gas: "300000000000000",
        methodName: "create",
      },
    ],
    receiverId: config.depositiumContractId,
  });

  transactions.push({
    functionCalls: [
      {
        amount: "0.1",
        args: {
          account_id: subAccId,
        },
        gas: "300000000000000",
        methodName: "storage_deposit",
      },
    ],
    receiverId: config.wrapNearContractId,
  });

  transactions.push({
    functionCalls: [
      {
        methodName: "storage_deposit",
        args: {
          account_id: subAccId,
        },
        amount: "0.1",
        gas: "300000000000000",
      },
    ],
    receiverId: config.farmingContractId,
  });

  transactions.push({
    functionCalls: [
      {
        args: {},
        gas: "300000000000000",
        methodName: "init",
      },
    ],
    receiverId: subAccId,
  });

  transactions.push({
    functionCalls: [
      {
        args: {
          account_id: accoundId,
          sub_account_id: subAccId,
          amount: utils.format.parseNearAmount(amount),
        },
        gas: "300000000000000",
        methodName: "start_strategy",
      },
    ],
    receiverId: config.depositiumContractId,
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
