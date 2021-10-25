import React from 'react';
import { Box, Button, TextField, Slider, Typography, InputAdornment } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import { 
    changeDepositAmount, 
    changeDays,
    selectStrategyItem,
} from './strategyItemSlice';
import {
    selectNearPrice
} from '../providers/priceSlice';

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                // bgcolor: 'secondary.light',
                borderColor: 'primary.main',
                borderBlock: 'solid',
                borderWidth: '1px',
                borderRight: 'solid',
                borderLeft: 'solid',
                textAlign: 'center',
                padding: '5px',
                fontSize: 19,
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}


export default function StrategyItem(props) {
    const strategy = props.srtategy;
    const strategyId = props.strategyId;

    const { depositAmount, profit, days } = useSelector(state => selectStrategyItem(state, strategyId));
    const nearPrice = useSelector(selectNearPrice);
    const dispatch = useDispatch();

    return <div style={{ width: '100%' }}>
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"strategyType . . strategyName"
                "depositInput depositInput depositProfit depositProfit"
                "apr period period start"
                `,
            }}
        >
            <Item sx={{ gridArea: 'strategyType' }}>
                {strategy.type}
            </Item>
            <Item sx={{ gridArea: 'strategyName' }}>
                {strategy.name}
            </Item>

            <Item sx={{ gridArea: 'depositInput' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                        <TextField
                            id="standard-basic"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Deposit"
                            variant="standard"
                            value={depositAmount}
                            onChange={(e) => dispatch(changeDepositAmount({ strategyId, value: e.target.value }))}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">NEAR</InputAdornment>,
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                        {nearPrice.times(depositAmount || 0).toFixed(2)}$
                    </Box>
                </Box>



            </Item>
            <Item sx={{ gridArea: 'depositProfit', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                Profit: ~{nearPrice.times(profit || 0).toFixed(2)}$
            </Item>

            <Item sx={{ gridArea: 'apr', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                APR: {strategy.apr}%
            </Item>
            <Item sx={{ gridArea: 'period' }}>
                <Typography gutterBottom>Days</Typography>
                <Slider
                    // name="days"    
                    aria-label="ios slider Always visible"
                    value={days}
                    // getAriaValueText={"Days"}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    onChange={(e) => dispatch(changeDays({ strategyId, value: e.target.value }))}
                    max={strategy.maxDays}
                />
                {/* <div>days</div> */}
            </Item>
            <Item sx={{ gridArea: 'start', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Button variant="contained" color="primary" size="small" endIcon={<PlayCircleOutlineIcon />}>
                    START
                </Button>
            </Item>
        </Box>
    </div>;
}