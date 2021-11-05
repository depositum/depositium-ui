import {keyStores, Near} from 'near-api-js';

const config = {
  explorerUrl: process.env.REACT_APP_EXPLORER_URL,
  helperUrl: process.env.REACT_APP_HELPER_URL,
  indexerUrl: process.env.REACT_APP_INDEXER_URL,
  networkId: process.env.REACT_APP_NETWORK_ID,
  nodeUrl: process.env.REACT_APP_NODE_URL,
  walletUrl: process.env.REACT_APP_WALLET_URL,
};

const nearAPI = new Near({
  keyStore: new keyStores.InMemoryKeyStore(),
  ...config,
});

export default nearAPI;
