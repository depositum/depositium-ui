import React, { ChangeEvent, useCallback, useMemo } from "react";
import { store } from "../../store";

interface Props {
  amount: string | number;
  onAmountChange: (value: string) => void;
  errorMessage: string | undefined;
}

const WithdrawCalculateBlock: React.FunctionComponent<Props> = ({
  amount,
  onAmountChange,
  errorMessage,
}) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onAmountChange(event.target.value);
    },
    [onAmountChange],
  );

  const amountFiat = useMemo(() => {
    if (errorMessage === undefined && Number(amount)) {
      return (Number(amount) * store.getState().balance.rate).toFixed(2);
    }
    return 0;
  }, [amount, errorMessage]);

  return (
    <div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          value={amount}
          onChange={onChange}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #DDDDDD",
            borderRadius: 5,
            boxSizing: "border-box",
            flexGrow: 1,
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal",
            height: 33,
            lineHeight: "26px",
            maxLines: 1,
            overflowX: "scroll",
            paddingLeft: 14,
            paddingRight: 14,
            resize: "none",
            whiteSpace: "nowrap",
          }}
          placeholder="NEAR"
        />
        <div
          style={{
            border: "1px solid #000000",
            margin: "0px 6px 0px 6px ",
            opacity: 0.2,
            width: 13,
          }}
        />
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
            {`$ ${amountFiat}`}
          </div>
        </div>
      </div>
      <div style={{ height: 12 }}>
        <div
          style={{
            color: "red",
            fontSize: 11,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "26px",
            opacity: 0.5,
          }}
        >
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WithdrawCalculateBlock);
