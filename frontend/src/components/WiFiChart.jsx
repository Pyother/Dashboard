import React, {useEffect, useState} from 'react';
import { Grid, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const data = [
    {
        number: 1,
        megabits_download: 40,
        megabits_upload: 30,
    },
    {
        number: 2,
        megabits_download: 50,
        megabits_upload: 50,
    },
    {
        number: 3,
        megabits_download: 100,
        megabits_upload: 30,
    },
    {
        number: 4,
        megabits_download: 30,
        megabits_upload: 60,
    },
    {
        number: 5,
        megabits_download: 120,
        megabits_upload: 110,
    }
]

const WiFiChart = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const newSocket = new W3CWebSocket('ws://localhost:8000/ws/dashboard/');

        newSocket.addEventListener('open', () => {
            console.log('WebSocket connected');
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.close();
            }
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
                    data={data}
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
                    <Line type="monotone" dataKey="megabits_download" stroke="#b700ff" />
                    <Line type="monotone" dataKey="megabits_upload" stroke="#00c8ff" />
                </LineChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <Button
                    style={{marginTop: "1em"}}
                    variant='text'
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