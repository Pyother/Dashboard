import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WiFiChart = () => {
    const [socket, setSocket] = useState(null);
    const [newJson, setNewJson] = useState([]);
    
    const updateChartData = () => {
        const newDataDownload = JSON.parse(localStorage.getItem('megabitsDownload')) || [];
        const newDataUpload = JSON.parse(localStorage.getItem('megabitsUpload')) || [];
        const array = [];
        for (let i = 0; i < newDataDownload.length; i++) {
            const row = {
                number: i,
                megabits_download: newDataDownload[i],
                megabits_upload: newDataUpload[i],
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
                    <Line type="monotone" dataKey="megabits_download" name="download speed" stroke="#b700ff" unit=" Mbps"/>
                    <Line type="monotone" dataKey="megabits_upload" name="upload speed" stroke="#00e0f5" unit=" Mbps"/>
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
