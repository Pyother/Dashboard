import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WiFiChart = () => {
    const [socket, setSocket] = useState(null);
    const [newJson, setNewJson] = useState([]);
    
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
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="number" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="signal_level" name="signal level" stroke="#b700ff" unit=" dBm"/>
                </LineChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <Button
                    style={{marginTop: "1em"}}
                    variant='outlined'
                    color='secondary'
                    onClick={sendWebSocketMessage}
                >
                    Make WiFi test
                </Button>
            </Grid>
        </Grid>
    );
}

export default WiFiChart;


