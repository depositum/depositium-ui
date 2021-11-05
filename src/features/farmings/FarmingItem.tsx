import React, { CSSProperties, useCallback, useMemo } from "react";
import { Box, Button, Card, styled } from "@mui/material";
import CalculatorIcon from "../../icons/CalculatorIcon";
import { FarmStatus, TokenName } from "../../hooks/useFarmsList";

interface Props {
  pair: {
    first: TokenName;
    second: TokenName;
  };
  status: FarmStatus;
  apr: string;
}

const FarmingItem: React.FunctionComponent<Props> = ({ pair, status, apr }) => {
  const onCalculate = useCallback(() => {
    console.log("click");
  }, []);

  const statusColor = useMemo(() => {
    switch (status) {
      case "in-progress":
        return "#00D254";
      case "active":
        return "#00ADD2";
      case "soon":
        return "#F0B622";
    }
  }, [status]);

  return (
    <Card
      sx={{
        borderBlock: "solid",
        borderColor: "#ECECEC",
        borderRadius: "10px",
        borderWidth: "1px",
        boxShadow: "0px 4px 20px rgba(103, 103, 103, 0.25)",
        overflow: "hidden",
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
            Farming
          </div>
          <CalculateButton
            onClick={onCalculate}
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
              fontSize: 20,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "26px",
              marginLeft: 16,
            }}
          >
            {`${pair.first}-${pair.second}`}
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "24px",
            }}
          >
            <div>
              <TokenIcon token={pair.first} />
              <TokenIcon style={{ marginLeft: 10 }} token={pair.second} />
            </div>
            <div
              style={{
                border: "1px solid #000000",
                height: 26,
                marginLeft: 45,
                marginRight: 30,
                opacity: 0.2,
              }}
            />
            <div
              style={{
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "26px",
                marginLeft: "16px",
                marginRight: "34px",
              }}
            >
              {`APR: ${apr}%`}
            </div>
          </div>
        </div>
      </Box>
    </Card>
  );
};

interface TokenIconProps {
  token: TokenName;
  style?: CSSProperties;
}

const TokenIcon: React.FunctionComponent<TokenIconProps> = ({
  token,
  style,
}) => {
  const tokenIconSrc = useMemo(() => {
    switch (token) {
      case "REF":
        return "./icons/ref.png";
      case "NEAR":
        return "./icons/near.png";
      case "USDT":
        return "./icons/usdt.png";
    }
  }, [token]);

  return <img style={style} src={tokenIconSrc} height={28} width={28} />;
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
