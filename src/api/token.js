import BN from 'bn.js';
import { baseDecode } from 'borsh';

import { Near, keyStores, utils, WalletConnection, ConnectedWalletAccount } from 'near-api-js';
import { functionCall, createTransaction } from 'near-api-js/lib/transaction';
import { PublicKey } from 'near-api-js/lib/utils';
import config from '../config';

const near = new Near({
  keyStore: new keyStores.InMemoryKeyStore(),
  ...config,
});


export default class SpecialWallet extends WalletConnection {
  _connectedAccount;

  account() {
    if (!this._connectedAccount) {
      this._connectedAccount = new SpecialWalletAccount(
        this,
        this._near.connection,
        this._authData.accountId
      );
    }

    return this._connectedAccount;
  }

  createTransaction({
    receiverId,
    actions,
    nonceOffset = 1,
  }) {
    return this._connectedAccount.createTransaction({
      receiverId,
      actions,
      nonceOffset,
    });
  }
}

export const wallet = new SpecialWallet(near, config.depositiumContractId);


export const ftViewFunction = (
  tokenId,
  { methodName, args }
) => {
  return wallet.account().viewFunction(tokenId, methodName, args);
};

export const ftGetStorageBalance = (
  tokenId,
  accountId = wallet.getAccountId()
) => {
  return ftViewFunction(tokenId, {
    methodName: 'storage_balance_of',
    args: { account_id: accountId },
  });
};

export const getGas = (gas) =>
  gas ? new BN(gas) : new BN('100000000000000');
export const getAmount = (amount) =>
  amount ? new BN(utils.format.parseNearAmount(amount)) : new BN('0');

export const executeMultipleTransactions = async (
  transactions,
  callbackUrl
) => {
  const nearTransactions = await Promise.all(
    transactions.map((t, i) => {
      return wallet.createTransaction({
        receiverId: t.receiverId,
        nonceOffset: i + 1,
        actions: t.functionCalls.map((fc) =>
          functionCall(
            fc.methodName,
            fc.args,
            getGas(fc.gas),
            getAmount(fc.amount)
          )
        ),
      });
    })
  );

  return wallet.requestSignTransactions(nearTransactions, callbackUrl);
};

class SpecialWalletAccount extends ConnectedWalletAccount {
  async sendTransactionWithActions(receiverId, actions) {
    return this.signAndSendTransaction(receiverId, actions);
  }

  async createTransaction({
    receiverId,
    actions,
    nonceOffset = 1,
  }) {
    const localKey = await this.connection.signer.getPublicKey(
      this.accountId,
      this.connection.networkId
    );
    let accessKey = await this.accessKeyForTransaction(
      receiverId,
      actions,
      localKey
    );
    if (!accessKey) {
      throw new Error(
        `Cannot find matching key for transaction sent to ${receiverId}`
      );
    }

    const block = await this.connection.provider.block({ finality: 'final' });
    const blockHash = baseDecode(block.header.hash);

    const publicKey = PublicKey.from(accessKey.public_key);
    const nonce = accessKey.access_key.nonce + nonceOffset;

    return createTransaction(
      this.accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash
    );
  }
}