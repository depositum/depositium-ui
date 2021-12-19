import Currency from "../models/Currency";
import CurrenciesAmount from "../models/CurrenciesAmount";

export default interface IBalanceRepository {
  getCurrencies(): Promise<Currency[]>;

  getPrices(): Promise<CurrenciesAmount>;

  getBalances(): Promise<CurrenciesAmount>;
}
