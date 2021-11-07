import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Card, Modal, styled } from "@mui/material";
import CalculatorIcon from "../../icons/CalculatorIcon";
import CalculatorModal from "../../modals/CalculatorModal/CalculatorModal";
import { startStrategy } from "../strategyItem/strategyItemSlice";
import { IStake } from "../../hooks/useStakesList";
import { TokenIcon } from "../../components/TokenIcon";

interface Props {
  stake: IStake;
}

const FarmingItem: React.FunctionComponent<Props> = ({ stake }) => {
  // Calculator control
  const [calculatorVisible, setCalculatorVisible] = useState(false);

  const dispatch = useDispatch();

  const onOpenCalculator = useCallback(() => {
    setCalculatorVisible(true);
  }, []);

  const onCloseCalculator = useCallback(() => {
    setCalculatorVisible(false);
  }, []);

  const onStartStrategy = useCallback(
    (e: any) => {
      dispatch(startStrategy({ strategyId: "any", value: e.target.value }));
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
        mb: "26px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
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
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#2D2D2D",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "26px",
              marginLeft: "14px",
            }}
          >
            {`${stake.provider} Staking`}
          </div>
          <CalculateButton
            onClick={onOpenCalculator}
            variant="text"
            startIcon={<CalculatorIcon />}
          >
            Calculate
          </CalculateButton>
        </div>
        <div
          style={{
            border: "1px solid #000000",
            margin: "10px 14px 30px 14px ",
            opacity: 0.1,
          }}
        />
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
      </Box>
      <Modal
        open={calculatorVisible}
        onClose={onCloseCalculator}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <CalculatorModal
          strategy={stake}
          onClose={onCloseCalculator}
          onStartStrategy={onStartStrategy}
        />
      </Modal>
    </Card>
  );
};

const CalculateButton = styled(Button)({
  color: "#0097A7",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "bold",
  lineHeight: "26px",
  marginRight: "8px",
  padding: "6px",
  textTransform: "none",
});

export default React.memo(FarmingItem);
