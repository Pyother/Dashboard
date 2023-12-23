import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Tooltip as MUITooltip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { IsMobileContext } from '../App.js';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { Parser } from '@json2csv/plainjs';

const DangerousFactorsChart = () => {

    const [socket, setSocket] = useState(null);
    const [json, setJson] = useState([]);
    const [measuring, setMeasuring] = useState(false);
    const { isMobile } = useContext(IsMobileContext);
    const parser = new Parser();

    const updateChartData = () => {
        const data = JSON.parse(localStorage.getItem('density')) || [];
        const array = [];
        for(let i = 0; i < data.length; i++) {
            const row = {
                number: i,
                density: data[i].density,
                time: data[i].time
            }
            array.push(row);
        }
        setJson(array);
    };

    useEffect(() => {
        const newSocket = new W3CWebSocket('ws://localhost:8000/ws/dashboard/');

        newSocket.addEventListener('open', () => {
            console.log('WebSocket connected');
        });

        setSocket(newSocket);

        const refreshInterval = setInterval(updateChartData, 1000);

        return () => {
            if (newSocket) {
                newSocket.close();
            }
            clearInterval(refreshInterval);
        };
    }, []);

    const sendWebSocketMessage = (message) => {
        if (socket && socket.readyState === socket.OPEN) {
            socket.send(message);
        }
    };

    return (
        <Grid container className='stats'>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={json}
                    margin={{
                        top: 5,
                        right: !isMobile ? 70 : 30,
                        left: !isMobile ? 60 : 5,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" unit=""/>
                    <YAxis unit={isMobile ? "" : "%"}/>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="density" name="density" stroke="#9c27b0" unit=" %" />
                </LineChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <MUITooltip
                    title={measuring ? "Stop measurement" : "Start measuring"}
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='contained'
                        color='secondary'
                        onClick={(_) => {
                            setMeasuring(!measuring);
                            if(measuring) sendWebSocketMessage("density_measurement_stop");
                            else sendWebSocketMessage("density_measurement_start");
                        }}
                    >
                        {measuring ? "Stop" : "Start"}
                    </Button>
                </MUITooltip>
                <MUITooltip
                    title="Save measurement results"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='outlined'
                        color='secondary'
                        disabled={json.length < 1}
                        onClick={() => {
                            const csv = parser.parse(json);
                            console.log(csv);

                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'density_measurement_results.csv';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                    >
                        <SaveAltIcon/>
                    </Button>
                </MUITooltip> : <></>
                <MUITooltip
                    title="Clear measurement results"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='outlined'
                        color='secondary'
                        onClick={(_) => {
                            localStorage.setItem('density', JSON.stringify([]));
                            updateChartData();
                        }}
                    >
                        <ClearIcon/>
                    </Button>
                </MUITooltip>
            </Grid>
        </Grid>
    );
}

export default DangerousFactorsChart;
