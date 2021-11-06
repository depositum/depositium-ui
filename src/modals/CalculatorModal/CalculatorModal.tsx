import React from "react";
import { Button, IconButton, styled } from "@mui/material";
import CloseIcon from "../../icons/CloseIcon";
import { TokenName } from "../../hooks/useFarmsList";
import CalculatorProfitBlock from "./CalculatorProfitBlock";
import CalculatorDepositBlock from "./CalculatorDepositBlock";
import CalculatorPairInfo from "./CalculatorPairInfo";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const calculateSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Invalid amount!")
    .min(0.01, "Too Short!")
    .max(10000, "Too Long!"),
  days: Yup.number().min(1, "Too Short!").max(90, "Too Long!"),
});

interface Props {
  pair: {
    first: TokenName;
    second: TokenName;
  };
  apr: string;
  onClose: () => void;
  onStartStrategy: (e: any) => void;
}

const CalculatorModal: React.FunctionComponent<Props> = ({
  pair,
  apr,
  onClose,
  onStartStrategy,
}) => (
  <React.Fragment>
    <Formik
      initialValues={{
        amount: "",
        days: 1,
      }}
      validationSchema={calculateSchema}
      onSubmit={onStartStrategy}
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
              <CalculatorPairInfo pair={pair} apr={apr} />
              <BlockDivider />
              <CalculatorDepositBlock
                amount={values.amount}
                onAmountChange={handleChange("amount")}
                errorMessage={errors.amount}
              />
              <BlockDivider />
              <CalculatorProfitBlock
                days={values.days}
                apr={Number(apr)}
                amount={values.amount}
                onDaysChange={handleChange("days")}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 26,
              }}
            >
              <StartButton onClick={() => handleSubmit}>Start</StartButton>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  </React.Fragment>
);

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

export default React.memo(CalculatorModal);
