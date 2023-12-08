import React, { useEffect, useState, useContext } from 'react';
import { Grid, Button, Tooltip as MUITooltip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { IsMobileContext } from '../App.js';

const WiFiChart = () => {
    const [socket, setSocket] = useState(null);
    const [newJson, setNewJson] = useState([]);
    const { isMobile } = useContext(IsMobileContext);
    const [measuring, setMeasuring] = useState(false);
    
    const updateChartData = () => {
        const newDataSignalLevel = JSON.parse(localStorage.getItem('signalLevel')) || [];
        const array = [];
        for (let i = 0; i < newDataSignalLevel.length; i++) {
            const row = {
                number: i,
                signal_level: newDataSignalLevel[i],
            };
            array.push(row);
        }
        setNewJson(array);
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('verfewj');
        }, 1000);
        return () => clearInterval(intervalId);
    }, [1000]); 

    const sendWebSocketMessage = () => {
        if (socket && socket.readyState === socket.OPEN) {
            socket.send("speedtest");
        }
    };

    return (
        <Grid container className='stats'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    width={500} 
                    height={300} 
                    data={newJson}
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
                    title="Start measuring the signal level of the WiFi network"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='contained'
                        color='secondary'
                        disabled={measuring}
                        onClick={(_) => {
                            setMeasuring(true);
                            console.log("Start");
                        }}
                    >
                        Start
                    </Button>
                </MUITooltip>
                <MUITooltip
                    title="Stop measuring the signal level of the WiFi network"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='contained'
                        color='secondary'
                        disabled={!measuring}
                        onClick={(_) => {
                            setMeasuring(false);
                            console.log("Stop");
                        }}
                    >
                        Stop
                    </Button>
                </MUITooltip>
                <MUITooltip
                    title="Makes single test of the signal level of the WiFi network"
                    arrow placement="top"
                >
                    <Button
                        style={{margin: "1em"}}
                        variant='outlined'
                        color='secondary'
                        onClick={sendWebSocketMessage}
                    >
                        Test
                    </Button>
                </MUITooltip>
            </Grid>
        </Grid>
    );
}

export default WiFiChart;


