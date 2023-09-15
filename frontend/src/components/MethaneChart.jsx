import React, {useState, useEffect} from 'react';
import { Grid, Button } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer } from 'recharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const MethaneChart = () => {
    const [socket, setSocket] = useState(null);
    const [newJson, setNewJson] = useState([]);

    const updateChartData = () => {
        const newData = JSON.parse(localStorage.getItem('methaneDensity')) || [];
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
            socket.send("methane_measurement");
        }
    };

    return (
        <Grid container className='stats'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={newJson}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorMethane" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#b700ff" stopOpacity={0.08}/>
                        <stop offset="90%" stopColor="#b700ff" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="number" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="density" name='methane density' unit=" ppm" stroke="#b700ff" fillOpacity={1} fill="url(#colorMethane)" />
                </AreaChart>
            </ResponsiveContainer>
            <Grid container className='centered'>
                <Button
                    style={{marginTop: "1em"}}
                    variant='text'
                    color='secondary'
                    onClick={sendWebSocketMessage}
                >
                    Make measurement
                </Button>
            </Grid>
        </Grid>
    );
}

export default MethaneChart;