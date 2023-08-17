import React from 'react';
import { Grid } from '@mui/material';
import Controller from './Controller';
// import './App.css';

const DrivingPanel = () => {
    return(
        <Grid container>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Dashboard → Driving Panel</h1>
            </Grid>
            <Grid item xs={12} md={12}>
                <Controller />
            </Grid>
        </Grid>
    )
}

export default DrivingPanel;