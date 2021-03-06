import React, { useCallback } from "react";
import { Button, IconButton, styled } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "../../icons/CloseIcon";
import WithdrawCalculateBlock from "./WithdrawCalculateBlock";
import { store } from "../../store";

const withdrawSchema = (balance: number) =>
  Yup.object().shape({
    amount: Yup.number()
      .typeError("Invalid amount!")
      .min(0.1, "Min amount is 0.1!")
      .max(balance, `Max amount is ${balance.toFixed(2)}!`),
  });

interface Props {
  onClose: () => void;
  onWithdraw: (amount: string) => void;
}

const WithdrawModal: React.FunctionComponent<Props> = ({
  onClose,
  onWithdraw,
}) => {
  const onSubmit = useCallback(
    ({ amount }) => {
      onWithdraw(amount);
    },
    [onWithdraw],
  );

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          amount: "",
        }}
        validationSchema={withdrawSchema(store.getState().balance.balance)}
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
                Withdraw NEAR
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
                <WithdrawCalculateBlock
                  amount={values.amount}
                  onAmountChange={handleChange("amount")}
                  errorMessage={errors.amount}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 14,
                }}
              >
                <WithdrawButton
                  disabled={
                    errors.amount !== undefined && values.amount.length === 0
                  }
                  onClick={() => handleSubmit()}
                >
                  Withdraw
                </WithdrawButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};

const WithdrawButton = styled(Button)({
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

export default React.memo(WithdrawModal);
