import { nearAPITestnet } from "./NearAPI";
import {WalletConnection} from "near-api-js";
import config from '../config';
const walletAPI = new WalletConnection(nearAPITestnet, config.depositiumContractId);

export default walletAPI
