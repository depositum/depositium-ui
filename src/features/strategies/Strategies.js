import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectStrategies } from './strategiesSlice';
import StrategyItem from '../strategyItem/StrategyItem';

export default function Strategies(props) {
    const strategies = useSelector(selectStrategies);

    return <div className="Strategies" >
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                justifyContent: 'space-around',
                p: 1,
                m: 1,
                maxWidth: 700,
                height: 300,
            }}
        >
            {
                Object.entries(strategies).map(([strategyId, s]) => (
                    <Box key={strategyId} sx={{ p: 1, m:1, bgcolor: 'primary.dark' }}>
                        <StrategyItem srtategy={s} strategyId={strategyId} />
                    </Box>
                ))
            }
        </Box>
    </div>;
}