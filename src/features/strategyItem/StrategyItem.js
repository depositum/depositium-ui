import React from "react";
import { Box } from "@mui/material";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        borderBlock: "solid",
        // bgcolor: 'secondary.light',
        borderColor: "primary.main",
        borderLeft: "solid",
        borderRight: "solid",
        borderWidth: "1px",
        fontSize: 19,
        fontWeight: "700",
        padding: "5px",
        textAlign: "center",
        ...sx,
      }}
      {...other}
    />
  );
}

const StrategyItem = ({ farm }) => {
  // const {depositAmount, profit, days} = useSelector(state =>
  //   selectStrategyItem(state, strategyId),
  // );
  // const nearPrice = useSelector(selectNearPrice);
  // const dispatch = useDispatch();
  console.log(farm);

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateAreas: `"strategyType . . strategyName"
                "depositInput depositInput depositProfit depositProfit"
                "apr period period start"
                `,
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto",
        }}
      >
        <Item sx={{ gridArea: "strategyType" }}>Farming</Item>
        <Item sx={{ gridArea: "strategyName" }}>{farm.pairName}</Item>

        {/*  <Item sx={{gridArea: 'depositInput'}}>*/}
        {/*    <Box*/}
        {/*      sx={{*/}
        {/*        display: 'flex',*/}
        {/*        flexDirection: 'row',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Box*/}
        {/*        sx={{*/}
        {/*          display: 'flex',*/}
        {/*          flex: 1,*/}
        {/*          flexDirection: 'column',*/}
        {/*          justifyContent: 'center',*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <TextField*/}
        {/*          id="standard-basic"*/}
        {/*          inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}*/}
        {/*          label="Deposit"*/}
        {/*          variant="standard"*/}
        {/*          value={depositAmount}*/}
        {/*          onChange={e =>*/}
        {/*            dispatch(*/}
        {/*              changeDepositAmount({strategyId, value: e.target.value}),*/}
        {/*            )*/}
        {/*          }*/}
        {/*          InputProps={{*/}
        {/*            endAdornment: (*/}
        {/*              <InputAdornment position="end">NEAR</InputAdornment>*/}
        {/*            ),*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </Box>*/}
        {/*      <Box*/}
        {/*        sx={{*/}
        {/*          display: 'flex',*/}
        {/*          flex: 1,*/}
        {/*          flexDirection: 'column',*/}
        {/*          justifyContent: 'center',*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {nearPrice.times(depositAmount || 0).toFixed(2)}$*/}
        {/*      </Box>*/}
        {/*    </Box>*/}
        {/*  </Item>*/}
        <Item
          sx={{
            display: "flex",
            flexDirection: "column",
            gridArea: "depositProfit",
            justifyContent: "center",
          }}
        >
          {/*Profit: ~{nearPrice.times(profit || 0).toFixed(2)}$*/}
        </Item>

        {/*  <Item*/}
        {/*    sx={{*/}
        {/*      display: 'flex',*/}
        {/*      flexDirection: 'column',*/}
        {/*      gridArea: 'apr',*/}
        {/*      justifyContent: 'center',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    APR: {strategy.apr}%*/}
        {/*  </Item>*/}
        {/*  <Item sx={{gridArea: 'period'}}>*/}
        {/*    <Typography gutterBottom>Days</Typography>*/}
        {/*    <Slider*/}
        {/*      // name="days"*/}
        {/*      aria-label="ios slider Always visible"*/}
        {/*      value={days}*/}
        {/*      // getAriaValueText={"Days"}*/}
        {/*      valueLabelDisplay="auto"*/}
        {/*      step={1}*/}
        {/*      marks*/}
        {/*      min={1}*/}
        {/*      onChange={e =>*/}
        {/*        dispatch(changeDays({strategyId, value: e.target.value}))*/}
        {/*      }*/}
        {/*      max={strategy.maxDays}*/}
        {/*    />*/}
        {/*    /!* <div>days</div> *!/*/}
        {/*  </Item>*/}
        {/*  <Item*/}
        {/*    sx={{*/}
        {/*      display: 'flex',*/}
        {/*      flexDirection: 'column',*/}
        {/*      gridArea: 'start',*/}
        {/*      justifyContent: 'center',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Button*/}
        {/*      variant="contained"*/}
        {/*      color="primary"*/}
        {/*      size="small"*/}
        {/*      endIcon={<PlayCircleOutlineIcon />}*/}
        {/*    >*/}
        {/*      START*/}
        {/*    </Button>*/}
        {/*  </Item>*/}
      </Box>
    </div>
  );
};

export default React.memo(StrategyItem);
