import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Controller from '../components/Controller';
import '../App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const DrivingPanel = () => {
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
            socket.send(message);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendWebSocketMessage();
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Driving Panel</h1>
            </Grid>
            <Grid item xs={12} md={12} className='statistics centered'>
                (Miejsce na panel statystyk)
            </Grid>
            <Grid item xs={12} md={12} className='movement-container centered'>
                <Grid container className='centered'>
                    <Grid item xs={12} md={12} className='centered' style={{paddingBottom: "1em"}}>
                        <Typography variant='p' style={{color: "white"}}>
                            Kontroler
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className='centered'>
                        <Controller />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DrivingPanel;
