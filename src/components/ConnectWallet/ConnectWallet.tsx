import { Button, styled } from "@mui/material";
import React, { useCallback } from "react";
import walletAPI from "../../api/WalletAPI";

const ConnectWallet = () => {
  const onClick = useCallback(() => {
    walletAPI.requestSignIn();
  }, []);

  return (
    <CustomButton
      variant="contained"
      endIcon={<img src="./icons/near.png" height={24} width={24} />}
      onClick={onClick}
    >
      Connect NEAR
    </CustomButton>
  );
};

const CustomButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  padding: "6px 12px 6px 12px",
  textTransform: "none",
});

export default React.memo(ConnectWallet);
