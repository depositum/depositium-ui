export default {
  depositiumContractId: process.env.REACT_APP_DEPOSITIUM_CONTRACT_ID,
  explorerUrl: process.env.REACT_APP_EXPLORER_URL,
  helperUrl: process.env.REACT_APP_HELPER_URL,
  indexerUrl: process.env.REACT_APP_INDEXER_URL,
  networkId: process.env.REACT_APP_NETWORK_ID,
  nodeUrl: process.env.REACT_APP_NODE_URL,
  walletUrl: process.env.REACT_APP_WALLET_URL,
  wrapNearContractId: process.env.REACT_APP_WRAP_NEAR_CONTRACT_ID,
  financeContractId: process.env.REACT_APP_REF_FINANCE_CONTRACT_ID,
  farmingContractId: process.env.REACT_APP_FARMING_CONTRACT_ID,
  activeFarms: process.env.REACT_APP_ACTIVE_FARMS.split(","),
  availableFarms: process.env.REACT_APP_AVAILABLE_FARMS.split(","),
};
