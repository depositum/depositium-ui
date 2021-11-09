import React, { useMemo } from "react";
import { store } from "../../store";

interface Props {
  depositAmount: number;
  profitAmount: number;
}

const StrategyProfit: React.FunctionComponent<Props> = ({
  depositAmount,
  profitAmount,
}) => (
  <>
    <div
      style={{
        border: "1px solid #000000",
        margin: "30px 14px 18px 14px ",
        opacity: 0.1,
      }}
    />
    <InfoBlock label="Deposit" amount={depositAmount} />
    <InfoBlock label="Profit" amount={profitAmount} />
  </>
);

interface InfoBlockProps {
  label: string;
  amount: number;
}

const InfoBlock: React.FunctionComponent<InfoBlockProps> = ({
  label,
  amount,
}) => {
  const amountFiat = useMemo(() => {
    if (Number(amount)) {
      return (Number(amount) * store.getState().balance.rate).toFixed(2);
    }
    return 0;
  }, [amount]);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 14,
        marginRight: 20,
        marginTop: 12,
      }}
    >
      <div
        style={{
          color: "#2D2D2D",
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: "bold",
          lineHeight: "20px",
          opacity: 0.9,
        }}
      >
        {`${label}:`}
      </div>
      <div style={{ flexDirection: "column" }}>
        <div
          style={{
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "bold",
            lineHeight: "20px",
            textAlign: "end",
            textTransform: "uppercase",
          }}
        >
          {`${amount.toFixed(2)} NEAR`}
        </div>
        <div
          style={{
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "26px",
            opacity: 0.5,
            textAlign: "end",
          }}
        >
          {`$${amountFiat} USD`}
        </div>
      </div>
    </div>
  );
};

export default React.memo(StrategyProfit);
