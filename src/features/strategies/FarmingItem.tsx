import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Card, Modal, styled } from "@mui/material";
import CalculatorIcon from "../../icons/CalculatorIcon";
import { IFarm } from "../../hooks/useFarmsList";
import CalculatorModal from "../../modals/CalculatorModal/CalculatorModal";
import { startStrategy } from "../strategyItem/strategyItemSlice";
import { TokenIcon } from "../../components/TokenIcon";

interface Props {
  farm: IFarm;
}

const FarmingItem: React.FunctionComponent<Props> = ({ farm }) => {
  const statusColor = useMemo(() => {
    switch (farm.status) {
      case "in-progress":
        return "#00D254";
      case "active":
        return "#00ADD2";
      case "soon":
        return "#F0B622";
    }
  }, [farm.status]);

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
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: statusColor,
          height: "8px",
          width: "100%",
        }}
      />
      {farm.status === "soon" && (
        <div
          style={{
            left: "50%",
            position: "absolute",
            top: 0,
            transform: "translate(-50%)",
          }}
        >
          <div
            style={{
              backgroundColor: "#F0B622",
              borderRadius: 6,
              color: "#FFFFFF",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "26px",
              marginLeft: 5,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            Coming soon
          </div>
        </div>
      )}
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
            {`${farm.provider} Farming`}
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
              {`${farm.pair.first}-${farm.pair.second}`}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 66,
              }}
            >
              <TokenIcon token={farm.pair.first} />
              <TokenIcon token={farm.pair.second} />
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
                width: 160,
              }}
            >
              {`APR: ${farm.apr}%`}
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
          strategy={farm}
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
