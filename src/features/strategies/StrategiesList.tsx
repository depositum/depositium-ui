import React, { useCallback } from "react";
import useFarmsList, { IFarm } from "../../hooks/useFarmsList";
import { Box, CircularProgress } from "@mui/material";
import FarmingItem from "./FarmingItem";
import useStakesList, { IStake } from "../../hooks/useStakesList";
import StakingItem from "./StakingItem";

const StrategiesList: React.FunctionComponent = () => {
  const { farms } = useFarmsList();
  const { stakes } = useStakesList();

  const strategyItem = useCallback((item: IFarm | IStake) => {
    switch (item._type) {
      case "stake":
        return <StakingItem stake={item} />;
      case "farm":
        return <FarmingItem farm={item} />;
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <StatusInfo color="#00D254" label="In progress" />
        <StatusInfo color="#00ADD2" label="Active" />
        <StatusInfo color="#F0B622" label="Coming soon" />
      </Box>
      {farms.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 2.5,
          }}
        >
          {[...farms, ...stakes].map((item, index) => (
            <Box
              key={item.id}
              sx={{
                mx: 2.5,
              }}
            >
              {strategyItem(item)}
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
            minWidth: 960,
          }}
        >
          <CircularProgress color="success" />
        </div>
      )}
    </>
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
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      ml: 4,
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
      {` — ${label}`}
    </div>
  </Box>
);

export default React.memo(StrategiesList);
