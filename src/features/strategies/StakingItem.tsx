import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Box, Card } from "@mui/material";
import { startStrategy } from "../strategyItem/strategyItemSlice";
import { IStake } from "../../hooks/useStakesList";
import { TokenIcon } from "../../components/TokenIcon";
import StrategyTitle from "../../components/Strategy/StrategyTitle";
import StrategyProfit from "../../components/Strategy/StrategyProfit";

interface Props {
  stake: IStake;
}

const StakingItem: React.FunctionComponent<Props> = ({ stake }) => {
  const statusColor = useMemo(() => {
    switch (stake.status) {
      case "in-progress":
        return "#00D254";
      case "active":
        return "#00ADD2";
      case "soon":
        return "#F0B622";
    }
  }, [stake.status]);

  const dispatch = useDispatch();

  const onStartStrategy = useCallback(
    (amount: string, strategyId: string) => {
      dispatch(startStrategy({ amount: amount, strategyId: strategyId }));
    },
    [dispatch],
  );

  return (
    <Card
      sx={{
        borderBlock: "solid",
        borderColor: "#ECECEC",
        borderRadius: "10px",
        borderWidth: "1px",
        boxShadow: "0px 4px 20px rgba(103, 103, 103, 0.25)",
        mt: 3,
        overflow: "hidden",
        position: "relative",
        width: 400,
      }}
    >
      <Box
        sx={{
          backgroundColor: statusColor,
          height: "8px",
          width: "100%",
        }}
      />
      <Box
        sx={{
          pb: "34px",
          pt: "12px",
        }}
      >
        <StrategyTitle strategy={stake} onStartStrategy={onStartStrategy} />
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
              marginLeft: 14,
              marginRight: 20,
              width: 200,
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
              {`${stake.token}`}
            </div>
            <TokenIcon token={stake.token} />
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
                width: 160,
              }}
            >
              {`APR: ${stake.apr}%`}
            </div>
          </div>
        </div>
        <StrategyProfit
          depositAmount={stake.depositAmount}
          profitAmount={stake.profitAmount}
        />
      </Box>
    </Card>
  );
};

export default React.memo(StakingItem);
