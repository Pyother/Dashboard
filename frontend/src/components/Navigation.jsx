import React, {useState} from "react";
import { Grid, Stack, IconButton } from '@mui/material';
import StatisticsPanel from "./StatisticsPanel";
import DrivingPanel from "./DrivingPanel";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import '../App.css';

const Navigation = () => {
    const [mode, setMode] = useState('driving');

    return (
        <Grid container className="navigation">
            <Grid item xs={12} md={1} style={{}}>
                <Stack>
                    <IconButton>
                        <SportsEsportsIcon style={{color: "wheat", fontSize: "xxx-large"}}/>
                    </IconButton>
                    <IconButton>

                    </IconButton>
                </Stack>
            </Grid>
            <Grid item xs={12} md={11} className="centered" style={{padding: "2em"}}>
                <Grid container style={{backgroundColor: "white", width: "100%", height: "100%", borderRadius: '2em'}}>
                    {
                        mode === 'statistics' ? 
                        <StatisticsPanel /> :
                        mode === 'driving' ? 
                        <DrivingPanel /> :
                        <></>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Navigation;