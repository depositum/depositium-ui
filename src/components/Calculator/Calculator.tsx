import React from "react";
import { Button, IconButton, Slider, styled } from "@mui/material";
import CloseIcon from "../../icons/CloseIcon";
import { TokenName } from "../../hooks/useFarmsList";
import { TokenIcon } from "../../features/farmings/FarmingItem";

const style = {
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  left: "50%",
  pb: 3,
  position: "absolute",
  pt: 2,
  px: 4,
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

interface Props {
  pair: {
    first: TokenName;
    second: TokenName;
  };
  apr: string;
  onClose: () => void;
  onStartStrategy: (e: any) => void;
}

const Calculator: React.FunctionComponent<Props> = ({ pair, apr, onClose, onStartStrategy }) => (
  <React.Fragment>
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
      <div style={{ paddingLeft: 39, paddingRight: 39 }}>
        <PairInfo pair={pair} apr={apr} />
        <div
          style={{
            border: "1px solid #000000",
            margin: "10px 0px 13px 0px ",
            opacity: 0.05,
          }}
        />
        <DepositBlock />
        <div
          style={{
            border: "1px solid #000000",
            margin: "10px 0px 13px 0px ",
            opacity: 0.05,
          }}
        />
        <ProfitBlock />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
        <StartButton onClick={onStartStrategy}>Start</StartButton>
      </div>
    </div>
  </React.Fragment>
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

interface PairInfoProps {
  pair: {
    first: TokenName;
    second: TokenName;
  };
  apr: string;
}

const PairInfo: React.FunctionComponent<PairInfoProps> = ({ pair, apr }) => (
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
        {`${pair.first}-${pair.second}`}
      </div>
      <div
        style={{
          marginLeft: "24px",
        }}
      >
        <TokenIcon token={pair.first} />
        <TokenIcon
          style={{ marginLeft: 10, marginRight: 32 }}
          token={pair.second}
        />
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
          minWidth: 160,
        }}
      >
        {`APR: ${apr}%`}
      </div>
    </div>
  </div>
);

const DepositBlock: React.FunctionComponent = () => (
  <div>
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
      Deposit
    </div>
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <textarea
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
          $ 2438924
        </div>
      </div>
    </div>
  </div>
);

const ProfitBlock: React.FunctionComponent = () => (
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
            0
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
          $ 2438924
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(Calculator);
