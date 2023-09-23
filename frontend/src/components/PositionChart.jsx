import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
     Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PositionChart = () => {

    const [data, setData] = useState(JSON.parse(localStorage.getItem('positionArray')));

    const handleClearAll = () => {
        localStorage.setItem('positionArray', JSON.stringify([{x: 0, y: 0}]));
        setData(JSON.parse(localStorage.getItem('positionArray')));
    }

    return (
        <Grid container className='stats'>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    width={500}
                    height={300}
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='x' type='number' name='X' unit='' />
                    <YAxis dataKey='y' type='number' name='Y' unit='' />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name='Data' data={data} fill='#b700ff' />
                </ScatterChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <Button
                    style={{marginTop: "1em"}}
                    variant='outlined'
                    color='secondary'
                    onClick={handleClearAll}
                >
                    Clear all positions
                </Button>
            </Grid>
        </Grid>
    );
}

export default PositionChart;