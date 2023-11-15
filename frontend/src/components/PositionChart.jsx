import React, { useState, useContext } from 'react';
import { Grid, Button } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
     Tooltip, ResponsiveContainer, Cell, Line } from 'recharts';
import { IsMobileContext } from '../App.js';

const PositionChart = () => {

    const [data, setData] = useState(JSON.parse(localStorage.getItem('positionArray')));
    const { isMobile } = useContext(IsMobileContext);

    const handleClearAll = () => {
        localStorage.setItem('positionArray', JSON.stringify([{x: 0, y: 0}]));
        setData(JSON.parse(localStorage.getItem('positionArray')));
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <Grid container className='stats'>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    margin={{
                        top: 5,
                        right: !isMobile ? 70 : 30,
                        left: !isMobile ? 60 : 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="horizontal position" unit="cm" />
                    <YAxis type="number" dataKey="y" name="vertical position" unit="cm" />
                    <ZAxis type="number" range={[100]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={data} fill="#9c27b0" line shape="cross" />
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