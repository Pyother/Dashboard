import React, {useState, useContext} from "react";
import { Grid, Stack, Button, Chip, Tooltip } from '@mui/material';
import StatisticsPanel from "./StatisticsPanel";
import DrivingPanel from "./DrivingPanel";
import { IsMobileContext } from "../App";
import '../App.css';

const Navigation = () => {
    const [mode, setMode] = useState('statistics');
    const { isMobile } = useContext(IsMobileContext);

    return (
        <Grid container className="navigation">
            <Grid item xs={12} md={2} className="panel">
                <Grid container className="centered">
                    <Grid item xs={4} md={12} className="panel-grid centered" style={{backgroundColor: "inherit"}}>
                        <Button className="button button-margin" onClick={() => setMode('statistics')}>
                            <Stack className="panel-stack">
                                    <p className="medium-hide"
                                        style={{color: 'white', 
                                        fontWeight: 'bold'}}
                                    >
                                        Statistics
                                    </p>
                            </Stack>
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={12} className="panel-grid centered" style={{backgroundColor: "inherit"}}>
                        <Button className="button button-margin" onClick={() => setMode('driving')}>
                            <Stack className="panel-stack">
                                <p className="medium-hide"
                                    style={{color: 'white', 
                                    fontWeight: 'bold'}}
                                >
                                    Drive
                                </p>
                            </Stack>
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={12} className="panel-grid centered">
                        <Button 
                            className="button"
                        >
                            <Stack className="panel-stack">
                                <p className="medium-hide">Settings</p>
                            </Stack>
                        </Button>
                    </Grid>
                    {
                        !isMobile ?
                        <Grid item xs={0} md={12} className="about">
                            <Grid container>    
                                <Grid item md={12} /*className="centered"*/ style={{paddingBottom: "0.5em"}}>
                                    <Tooltip
                                        title="Device you're connected with"
                                        arrow placement="top"
                                    >
                                        <Chip 
                                            label="Raspberry Pi 3A+" 
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item md={12} style={{/*textAlign: "center"*/}}>
                                    <p>(Some info about the author)</p>
                                </Grid>
                            </Grid>
                        </Grid> :
                        <></>
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} md={10} className="main">
                <Grid container style={{
                    backgroundColor: "#1c1c27", width: "100%", height: "100%", display: "block",
                    borderRadius: "0.5em",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
                >
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