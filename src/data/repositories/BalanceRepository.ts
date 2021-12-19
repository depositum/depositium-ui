import IBalanceRepository from "../interfaces/IBalanceRepository";
import CurrenciesAmount from "../models/CurrenciesAmount";
import Currency from "../models/Currency";

class BalanceRepository implements IBalanceRepository {
  getBalances(): Promise<CurrenciesAmount> {
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            NEAR: "100",
            REF: "232",
          }),
        650,
      ),
    );
  }

  async getCurrencies(): Promise<Currency[]> {
    return new Promise(resolve =>
      setTimeout(() => resolve(["NEAR", "REF"]), 250),
    );
  }

  async getPrices(): Promise<CurrenciesAmount> {
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            NEAR: "23.4",
            REF: "0.4",
          }),
        250,
      ),
    );
  }
}

export const balanceRepository = (): IBalanceRepository =>
  new BalanceRepository();
