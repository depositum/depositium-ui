import React, { useCallback } from "react";
import { Button, IconButton, styled } from "@mui/material";
import CloseIcon from "../../icons/CloseIcon";
import { IFarm } from "../../hooks/useFarmsList";
import CalculatorProfitBlock from "./CalculatorProfitBlock";
import CalculatorDepositBlock from "./CalculatorDepositBlock";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IStake } from "../../hooks/useStakesList";
import CalculatorFarmInfo from "./CalculatorFarmInfo";
import CalculatorStakeInfo from "./CalculatorStakeInfo";
import walletAPI from "../../api/WalletAPI";

const calculateSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Invalid amount!")
    .min(0.01, "Too Short!")
    .max(10000, "Too Long!"),
  days: Yup.number().min(1, "Too Short!").max(90, "Too Long!"),
});

interface Props {
  strategy: IFarm | IStake;
  onClose: () => void;
  onStartStrategy: (amount: string, strategyId: string) => void;
  onTakeOut: () => void;
}

const CalculatorModal: React.FunctionComponent<Props> = ({
  strategy,
  onClose,
  onStartStrategy,
  onTakeOut,
}) => {
  const infoBlock = useCallback(() => {
    switch (strategy._type) {
      case "stake":
        return (
          <CalculatorStakeInfo token={strategy.token} apr={strategy.apr} />
        );
      case "farm":
        return <CalculatorFarmInfo pair={strategy.pair} apr={strategy.apr} />;
    }
  }, [strategy]);

  const onSubmit = useCallback(
    ({ amount, strategyId }) => {
      onStartStrategy(amount, String(strategyId));
    },
    [onStartStrategy],
  );

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          amount: "",
          days: 1,
          strategyId: strategy.id,
        }}
        validationSchema={calculateSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => (
          <div
            style={{
              backgroundColor: "#E9EDF0",
              border: "1px solid #E9EDF0",
              borderRadius: 10,
              boxShadow: "0px 4px 10px rgba(204, 204, 204, 0.25)",
              boxSizing: "border-box",
              left: "50%",
              paddingBottom: 26,
              paddingTop: 28,
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 39,
                paddingRight: 18,
              }}
            >
              <div
                style={{
                  color: "#2D2D2D",
                  fontSize: 20,
                  fontStyle: "normal",
                  fontWeight: "bold",
                  lineHeight: "26px",
                }}
              >
                Farming
              </div>
              <IconButton onClick={onClose} aria-label="delete" size="small">
                <CloseIcon />
              </IconButton>
            </div>
            <div
              style={{
                border: "1px solid #000000",
                margin: "10px 0px 20px 0px ",
                opacity: 0.2,
              }}
            />
            <Form>
              <div style={{ paddingLeft: 39, paddingRight: 39 }}>
                {infoBlock()}
                <BlockDivider />
                <CalculatorDepositBlock
                  amount={values.amount}
                  onAmountChange={handleChange("amount")}
                  errorMessage={errors.amount}
                />
                <BlockDivider />
                <CalculatorProfitBlock
                  days={values.days}
                  apr={Number(strategy.apr)}
                  amount={values.amount}
                  onDaysChange={handleChange("days")}
                />
              </div>
              {walletAPI.isSignedIn() && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 26,
                  }}
                >
                  {strategy.status == "active" && (
                    <StartButton onClick={() => handleSubmit()}>
                      Start
                    </StartButton>
                  )}
                  {/*{strategy.status == "in-progress" && (*/}
                  <TakeOutButton onClick={onTakeOut}>Take Out</TakeOutButton>
                  {/*)}*/}
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};

const BlockDivider: React.FunctionComponent = () => (
  <div
    style={{
      border: "1px solid #000000",
      margin: "10px 0px 13px 0px ",
      opacity: 0.05,
    }}
  />
);

const StartButton = styled(Button)({
  backgroundColor: "#0097A7",
  borderRadius: 20,
  color: "#FFFFFF",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "bold",
  height: 33,
  lineHeight: "26px",
  marginRight: "8px",
  padding: "6px",
  textTransform: "none",
  width: 110,
});

const TakeOutButton = styled(Button)({
  backgroundColor: "red",
  borderRadius: 20,
  color: "#FFFFFF",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "bold",
  height: 33,
  lineHeight: "26px",
  marginRight: "8px",
  padding: "6px",
  textTransform: "none",
  width: 110,
});

export default React.memo(CalculatorModal);
