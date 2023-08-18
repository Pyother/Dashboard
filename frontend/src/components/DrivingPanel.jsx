import React from 'react';
import { Grid } from '@mui/material';
import Controller from './Controller';
import '../App.css';

const DrivingPanel = () => {
    return(
        <Grid container>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Driving Panel</h1>
            </Grid>
            <Grid item xs={12} md={12} className='statistics' style={{border: "1px solid red"}}>
                A 
            </Grid>
            <Grid item xs={12} md={12} className="movement-container">
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <Controller />
                    </Grid>
                    <Grid item xs={0} md={7} className='movement-info'>
                        <div>
                            <p><strong>How to drive?</strong></p>
                            <p>Gently move the square on the left and the vehicle will move in the indicated direction.</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DrivingPanel;