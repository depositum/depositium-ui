import { Box, CircularProgress } from "@mui/material";

import useFarmsList from "../../hooks/useFarmsList";
import FarmingItem from "../farmings/FarmingItem";

export default function Strategies() {
  // const strategies = useSelector(selectStrategies);
  const { farms } = useFarmsList();

  return (
    <div className="Strategies">
      <Box
        sx={{
          alignContent: "flex-start",
          display: "flex",
          flexWrap: "wrap",
          height: 300,
          justifyContent: "space-around",
          m: 1,
          maxWidth: 700,
          p: 1,
        }}
      >
        {farms.length > 0 ? (
          farms.map(farm => (
            <Box key={farm.id} sx={{ m: 1, p: 1 }}>
              {/*<StrategyItem farm={farm} />*/}
              <FarmingItem
                status="soon"
                pair={{ first: "USDT", second: "NEAR" }}
                apr={20}
              />
            </Box>
          ))
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
