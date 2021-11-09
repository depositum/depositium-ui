import React, { CSSProperties, useMemo } from "react";
import { TokenName } from "../../hooks/useFarmsList";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNearBalance from "../../hooks/useNearBalance";
import { Box } from "@mui/material";

const Balance: React.FunctionComponent = () => (
  <Box
    sx={{
      backgroundColor: "#0097A7",
      height: "100%",
      px: 5,
      py: 8,
    }}
  >
    <NearBalance />
  </Box>
);

const NearBalance: React.FunctionComponent = () => {
  const { balance, rate, fiatAmount } = useNearBalance();

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
            {`${balance} NEAR`}
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
            {`$ ${rate}`}
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
            {`$${fiatAmount} USD`}
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
