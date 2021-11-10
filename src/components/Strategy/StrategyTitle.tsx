import React, { useCallback, useState } from "react";
import CalculatorIcon from "../../icons/CalculatorIcon";
import { Box, Button, Modal, styled } from "@mui/material";
import CalculatorModal from "../../modals/CalculatorModal/CalculatorModal";
import { IFarm } from "../../hooks/useFarmsList";
import { IStake } from "../../hooks/useStakesList";
import { LocalAtm } from "@mui/icons-material";

interface Props {
  strategy: IFarm | IStake;
  onStartStrategy: (amount: string, strategyId: string) => void;
  onStopStrategy: (strategyId: string) => void;
}

const StrategyTitle: React.FunctionComponent<Props> = ({
  strategy,
  onStartStrategy,
  onStopStrategy,
}) => {
  // Calculator control
  const [calculatorVisible, setCalculatorVisible] = useState(false);

  const onOpenCalculator = useCallback(() => {
    setCalculatorVisible(true);
  }, []);

  const onCloseCalculator = useCallback(() => {
    setCalculatorVisible(false);
  }, []);

  const onFinish = useCallback(() => {
    onStopStrategy(String(strategy.id));
  }, [onStopStrategy, strategy.id]);

  return (
    <>
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
          {strategy.provider}
        </div>
        <Box>
          <CalculateButton
            onClick={onOpenCalculator}
            variant="text"
            startIcon={<CalculatorIcon />}
          >
            Estimate
          </CalculateButton>
          {strategy.status == "in-progress" && (
            <FinishButton
              startIcon={<LocalAtm sx={{ height: "18px", width: "18px" }} />}
              onClick={onFinish}
            >
              Finish
            </FinishButton>
          )}
        </Box>
      </div>
      <div
        style={{
          border: "1px solid #000000",
          margin: "10px 14px 30px 14px ",
          opacity: 0.1,
        }}
      />
      <Modal
        open={calculatorVisible}
        onClose={onCloseCalculator}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <CalculatorModal
          strategy={strategy}
          onClose={onCloseCalculator}
          onStartStrategy={onStartStrategy}
        />
      </Modal>
    </>
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

const FinishButton = styled(Button)({
  color: "black",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "bold",
  lineHeight: "26px",
  marginLeft: "4px",
  marginRight: "8px",
  padding: "6px",
  textTransform: "none",
});

export default React.memo(StrategyTitle);
