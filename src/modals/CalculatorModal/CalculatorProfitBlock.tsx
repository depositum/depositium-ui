import React, { useCallback, useMemo } from "react";
import { Slider } from "@mui/material";
import { store } from "../../store";

interface Props {
  days: number;
  apr: number;
  amount: string | number;
  onDaysChange: (value: string) => void;
}

const CalculatorProfitBlock: React.FunctionComponent<Props> = ({
  days,
  apr,
  amount,
  onDaysChange,
}) => {
  const onChange = useCallback(
    (event: React.SyntheticEvent | Event, value: number | number[]) => {
      if (Number(value)) {
        onDaysChange(value.toString());
      }
    },
    [onDaysChange],
  );

  const profit = useMemo(() => {
    if (Number(amount)) {
      return (
        ((Number(amount) * apr * days) / 365 / 100) *
        store.getState().balance.rate
      ).toFixed(2);
    }
    return 0;
  }, [amount, apr, days]);

  return (
    <div>
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
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "26px",
            opacity: 0.5,
          }}
        >
          Days
        </div>
        <div
          style={{
            color: "#2D2D2D",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "26px",
            opacity: 0.5,
            width: 160,
          }}
        >
          Profit
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
            flexDirection: "column",
            flexGrow: 1,
            marginRight: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "#2D2D2D",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal",
                lineHeight: "26px",
                opacity: 0.3,
              }}
            >
              1
            </div>
            <div
              style={{
                color: "#2D2D2D",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal",
                lineHeight: "26px",
                opacity: 0.3,
              }}
            >
              90
            </div>
          </div>
          <div style={{ marginLeft: 4, marginRight: 6 }}>
            <Slider
              defaultValue={1}
              onChange={onChange}
              min={1}
              max={90}
              size="small"
              step={1}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#383838",
            border: "1px solid #413F3F",
            borderRadius: 5,
            boxShadow: "inset 0px 4px 4px #383030",
            boxSizing: "border-box",
            display: "flex",
            height: 33,
            justifyContent: "center",
            minWidth: 160,
            paddingTop: 4,
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "26px",
            }}
          >
            {`$ ${profit}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalculatorProfitBlock);
