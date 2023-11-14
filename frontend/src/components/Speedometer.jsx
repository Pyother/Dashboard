import React from 'react';
import { Grid, Paper } from '@mui/material';
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Acceleration',
        value: 5.8,
        fill: '#915c06',
    },
    {
        name: 'Speed',
        value: 12.56,
        fill: '#912606',
    },
];

const Speedometer = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Paper elevation={3}>
          <ResponsiveContainer width="100%" height={200} style={{backgroundColor: "#1c1c27 !important"}}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              barSize={10}
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="value" />
              <Tooltip />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Speedometer;
