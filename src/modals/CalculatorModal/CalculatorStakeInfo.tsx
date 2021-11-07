import React from "react";
import { TokenIcon } from "../../components/TokenIcon";
import { TokenName } from "../../hooks/useFarmsList";

interface Props {
  token: TokenName;
  apr: string;
}

const CalculatorStakeInfo: React.FunctionComponent<Props> = ({
  token,
  apr,
}) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        marginRight: 20,
        width: 180,
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
        {`${token}`}
      </div>
      <TokenIcon token={token} />
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

export default React.memo(CalculatorStakeInfo);
