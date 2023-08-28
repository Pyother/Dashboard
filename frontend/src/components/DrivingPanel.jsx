import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Controller from './Controller';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
import '../App.css';

const DrivingPanel = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    
        const chartData = storedData.map((item, index) => ({
            name: `Position ${index + 1}`,
            value: item.x, 
        }));
    
        setData(chartData);
    }, []);
    
    return(
        <Grid container>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Driving Panel</h1>
            </Grid>
            <Grid item xs={10} md={11.5} className='statistics'>
                <div style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Line type='monotone' dataKey='value' stroke='#8884d8' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Grid>
            <Grid item xs={12} md={12} className="movement-container">
                <Grid container>
                    <Grid item xs={12} md={5} className='centered'>
                        <Controller />
                    </Grid>
                    <Grid item xs={0} md={7} className='movement-info'>
                        <div>
                            <p style={{color: "black"}}><strong>How to drive?</strong></p>
                            <p style={{color: "black"}}>Gently move the circle on the left and the vehicle will move in the indicated direction.</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DrivingPanel;
