import { TokenName } from "../../hooks/useFarmsList";
import React from "react";
import { TokenIcon } from "../../features/farmings/FarmingItem";

interface Props {
  pair: {
    first: TokenName;
    second: TokenName;
  };
  apr: string;
}

const CalculatorPairInfo: React.FunctionComponent<Props> = ({ pair, apr }) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
    }}
  >
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "26px",
        }}
      >
        {`${pair.first}-${pair.second}`}
      </div>
      <div
        style={{
          marginLeft: "24px",
        }}
      >
        <TokenIcon token={pair.first} />
        <TokenIcon
          style={{ marginLeft: 10, marginRight: 32 }}
          token={pair.second}
        />
      </div>
    </div>
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          border: "1px solid #000000",
          height: 26,
          opacity: 0.2,
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 500,
          justifyContent: "center",
          lineHeight: "26px",
          minWidth: 160,
        }}
      >
        {`APR: ${apr}%`}
      </div>
    </div>
  </div>
);

export default React.memo(CalculatorPairInfo);
