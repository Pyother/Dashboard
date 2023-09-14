import React from 'react';
import { Grid } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GasesChart = () => {
    const data = [
        { time: '00:00', gas1: 10, gas2: 15 },
        { time: '01:00', gas1: 12, gas2: 18 },
        { time: '02:00', gas1: 15, gas2: 20 },
        { time: '03:00', gas1: 13, gas2: 16 },
    ];

    return (
        <Grid container className='stats'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="gas1" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="gas2" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default GasesChart;
