import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { IsMobileContext } from '../App.js';

const DangerousFactorsChart = () => {

    const [socket, setSocket] = useState(null);
    const [newJson, setNewJson] = useState([]);
    const { isMobile } = useContext(IsMobileContext);

    const updateChartData = () => {
        const newData = JSON.parse(localStorage.getItem('carbonMonoxideDensity')) || [];
        const array = [];
        for(let i = 0; i < newData.length; i++) {
            const row = {
                number: i,
                density: newData[i]
            }
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

        const refreshInterval = setInterval(updateChartData, 1000);

        return () => {
            if (newSocket) {
                newSocket.close();
            }
            clearInterval(refreshInterval);
        };
    }, []);

    const sendWebSocketMessage = () => {
        if (socket && socket.readyState === socket.OPEN) {
            socket.send("carbon_monoxide_measurement");
        }
    };

    return (
        <Grid container className='stats'>
            <ResponsiveContainer>
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
                    <YAxis unit={isMobile ? "" : "%"}/>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="density" name="density" stroke="#9c27b0" unit=" %" />
                </LineChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <Button
                    style={{marginTop: "1em"}}
                    variant='outlined'
                    color='secondary'
                    onClick={sendWebSocketMessage}
                >
                    Make measurement
                </Button>
            </Grid>
        </Grid>
    );
}

export default DangerousFactorsChart;
