import React from "react";
import useFarmsList from "../../hooks/useFarmsList";
import { Box, CircularProgress } from "@mui/material";
import FarmingItem from "./FarmingItem";

const FarmsList: React.FunctionComponent = () => {
  const { farms } = useFarmsList();

  return (
    <div style={{ height: "100%", padding: "0px 40px 40px 40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 23,
        }}
      >
        <StatusInfo color="#00D254" label="In progress" />
        <StatusInfo color="#00ADD2" label="Active" />
        <StatusInfo color="#F0B622" label="Coming soon" />
      </div>
      {farms.length > 0 ? (
        <Box
          sx={{
            alignContent: "flex-start",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {farms.map(farm => (
            <Box key={farm.id}>
              <FarmingItem
                status={farm.status}
                pair={farm.pair}
                apr={farm.apr}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

interface StatusInfoProps {
  color: string;
  label: string;
}

const StatusInfo: React.FunctionComponent<StatusInfoProps> = ({
  color,
  label,
}) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      margin: "20px 18px 0px 18px",
    }}
  >
    <div
      style={{
        backgroundColor: color,
        borderRadius: 10,
        height: 15,
        width: 15,
      }}
    />
    <div
      style={{
        color: "#2D2D2D",
        fontSize: 11,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "26px",
        marginLeft: 5,
        opacity: 0.4,
      }}
    >
      {` - ${label}`}
    </div>
  </div>
);

export default React.memo(FarmsList);
