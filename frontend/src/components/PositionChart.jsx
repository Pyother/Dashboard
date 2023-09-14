import React from 'react';
import { Grid } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { x: 1, y: 10 },
    { x: -2, y: 15 },
    { x: 3, y: -13 },
    { x: 3, y: 17 },
    { x: 5, y: 20 },
  ];

const PositionChart = () => {
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
                    <Scatter name='Data' data={data} fill='#8884d8' />
                </ScatterChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default PositionChart;