import React, { ReactChild, useMemo } from "react";
import { ArrowCircleDown, MonetizationOn } from "@mui/icons-material";
import { Box } from "@mui/material";
import useNearBalance from "../../hooks/useNearBalance";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        ml: "14px",
        mr: "20px",
        mt: "12px",
      }}
    >
      <InfoBlock
        icon={<ArrowCircleDown fontSize="large" />}
        amount={depositAmount}
      />
      <InfoBlock
        icon={<MonetizationOn fontSize="large" />}
        amount={profitAmount}
      />
    </Box>
  </>
);

interface InfoBlockProps {
  icon: ReactChild;
  amount: number;
}

const InfoBlock: React.FunctionComponent<InfoBlockProps> = ({
  icon,
  amount,
}) => {
  const { balance } = useNearBalance();

  const amountFiat = useMemo(() => {
    if (Number(amount)) {
      return (Number(amount) * Number(balance)).toFixed(2);
    }
    return 0;
  }, [amount, balance]);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box sx={{ alignItems: "center", mr: 2 }}>{icon}</Box>
      <div style={{ flexDirection: "column" }}>
        <div
          style={{
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "bold",
            lineHeight: "20px",
            textAlign: "start",
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
            textAlign: "start",
          }}
        >
          {`$${amountFiat} USD`}
        </div>
      </div>
    </Box>
  );
};

export default React.memo(StrategyProfit);
