import React, { useEffect, useState, useContext } from 'react';
import { Grid, Button, Tooltip as MUITooltip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { IsMobileContext } from '../App.js';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { Parser } from '@json2csv/plainjs';

const WiFiChart = () => {
    const [socket, setSocket] = useState(null);
    const [json, setJson] = useState([]);
    const { isMobile } = useContext(IsMobileContext);
    const [measuring, setMeasuring] = useState(false);
    const parser = new Parser();
    
    const updateChartData = () => {
        const data = JSON.parse(localStorage.getItem('wifi')) || [];
        const array = [];
        for (let i = 0; i < data.length; i++) {
            const row = {
                number: i,
                signal_level: data[i].signal_level,
                ssid: data[i].ssid,
                time: data[i].time,
                position: data[i].position
            };
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

        const refreshInterval = setInterval(updateChartData, 500);

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
            <ResponsiveContainer width="100%" height="100%">
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
                    <YAxis unit={isMobile ? "" : "dBm"}/>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="signal_level" name="signal level" stroke="#9c27b0" unit=" dBm" />
                </LineChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <MUITooltip
                    title={measuring ? "Stop measurement" : "Start measurement"}
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='contained'
                        color='secondary'
                        onClick={(_) => {
                            setMeasuring(!measuring);
                            if(measuring) sendWebSocketMessage("wifi_measurement_stop");
                            else sendWebSocketMessage("wifi_measurement_start");
                        }}
                    >
                        {measuring ? "Stop" : "Start" }
                    </Button>
                </MUITooltip>
                <MUITooltip
                    title="Stop measuring the signal level of the WiFi network"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='outlined'
                        color='secondary'
                        disabled={json.length < 1}
                        onClick={(_) => {
                            const csv = parser.parse(json);
                            console.log(csv);

                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'wifi_measurement_results.csv';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                    >
                        <SaveAltIcon/>
                    </Button>
                </MUITooltip>
                <MUITooltip
                    title="Clear measurement results"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='outlined'
                        color='secondary'
                        onClick={(_) => {
                            localStorage.setItem('wifi', JSON.stringify([]));
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

export default WiFiChart;


