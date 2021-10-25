import nearAPI from "./NearAPI";
import {WalletConnection} from "near-api-js";

const walletAPI = new WalletConnection(nearAPI, 'depositium');

export default walletAPI
