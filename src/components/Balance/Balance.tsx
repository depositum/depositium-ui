import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { TokenName } from "../../hooks/useFarmsList";
import { fetchPricesFromREF } from "../../features/providers/priceAPI";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Decimal from "decimal.js";
import { fetchAccountBalance } from "../../features/providers/contractAPI";

const Balance: React.FunctionComponent = () => (
  <div>
    <NearBalance />
  </div>
);

const NearBalance: React.FunctionComponent = () => {
  // Preloading and set balance
  const [balance, setBalance] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function fetchBalance() {
      // const balance = await walletAPI.account().getAccountBalance();
      const balance = await fetchAccountBalance();
      // const amountInYocto = utils.format.formatNearAmount(balance.total, 5);
      setBalance(balance);
    }
    fetchBalance();
  }, []);

  // Preloading and set price
  const [price, setPrice] = useState<Decimal | undefined>(undefined);
  useEffect(() => {
    async function fetchNearPrice() {
      const nearPrice = await fetchPricesFromREF();
      setPrice(nearPrice);
    }
    fetchNearPrice();
  }, []);

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        display: "flex",
        paddingLeft: 19,
        paddingRight: 21,
      }}
    >
      <TokenIcon
        token="NEAR"
        style={{ height: 38, marginBottom: 19, marginTop: 17, width: 38 }}
      />
      <div
        style={{
          marginBottom: 12,
          marginLeft: 12,
          marginTop: 19,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "20px",
              textTransform: "uppercase",
            }}
          >
            Near
          </div>
          <div
            style={{
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "20px",
              textTransform: "uppercase",
            }}
          >
            {`${balance ?? "~"} NEAR`}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "26px",
              opacity: 0.5,
            }}
          >
            {`$ ${price ? price.toFixed(2) : "~"}`}
          </div>
          <div
            style={{
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "26px",
              opacity: 0.5,
            }}
          >
            {`$ ${
              price && balance ? price.times(balance).toFixed(2) : "~"
            } USD`}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TokenIconProps {
  token: TokenName;
  style?: CSSProperties;
}

const TokenIcon: React.FunctionComponent<TokenIconProps> = ({
  token,
  style,
}) => {
  const tokenIconSrc = useMemo(() => {
    switch (token) {
      case "REF":
        return "./icons/ref.png";
      case "NEAR":
        return "./icons/near.png";
      case "USDT":
        return "./icons/usdt.png";
    }
  }, [token]);

  return <img style={style} src={tokenIconSrc} height="24px" width="24px" />;
};

export default React.memo(Balance);
