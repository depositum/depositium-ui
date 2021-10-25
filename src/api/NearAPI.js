import {keyStores, Near} from "near-api-js";

const config = {
    networkId: process.env.REACT_APP_NETWORK_ID,
    nodeUrl: process.env.REACT_APP_NODE_URL,
    walletUrl: process.env.REACT_APP_WALLET_URL,
    helperUrl: process.env.REACT_APP_HELPER_URL,
    explorerUrl: process.env.REACT_APP_EXPLORER_URL,
    indexerUrl: process.env.REACT_APP_INDEXER_URL,
};

const nearAPI = new Near({
    keyStore: new keyStores.InMemoryKeyStore(),
    ...config,
});

export default nearAPI;
