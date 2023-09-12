import React, {useState} from "react";
import { Grid, Stack, IconButton } from '@mui/material';
import StatisticsPanel from "./StatisticsPanel";
import DrivingPanel from "./DrivingPanel";
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import '../App.css';

const Navigation = () => {
    const [mode, setMode] = useState('statistics');

    return (
        <Grid container className="navigation">
            <Grid item xs={12} md={2} className="panel">
                <Grid container className="centered">
                    <Grid item xs={4} md={12} className="panel-grid centered" style={{backgroundColor: mode === "statistics" ? "white" : "black", borderRadius: "1em"}}>
                        <Stack className="panel-stack" style={{backgroundColor: mode === "statistics" ? "white" : "black"}}>
                            <IconButton children={<InsertChartOutlinedSharpIcon fontSize="large" 
                                style={{color: mode === "statistics" ? "black" : "white"}}/>}
                                onClick={() => setMode('statistics')}></IconButton> 
                                <p className="medium-hide" style={{color: mode === "statistics" ? "black" : "white"}}>Statistics</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} md={12} className="panel-grid centered" style={{backgroundColor: mode === "driving" ? "white" : "black", borderRadius: "1em"}}>
                        <Stack className="panel-stack">
                            <IconButton children={<SportsEsportsOutlinedIcon fontSize="large" 
                                style={{color: mode === "driving" ? "black" : "white"}}/>}
                                onClick={() => setMode('driving')}></IconButton>
                            <p className="medium-hide" style={{color: mode === "driving" ? "black" : "white"}}>Drive</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} md={12} className="panel-grid centered">
                        <Stack className="panel-stack">
                            <IconButton children={<SettingsOutlinedIcon fontSize="large" style={{color: "white"}}/>}></IconButton>
                            <p className="medium-hide">Settings</p>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={10} className="main">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "100%", display: "block", borderRadius: "1em"}}>
                    {
                        mode === 'driving' ? 
                        <>
                            <DrivingPanel />
                        </> :
                        mode === 'statistics' ? 
                        <StatisticsPanel /> :
                        <></>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Navigation;