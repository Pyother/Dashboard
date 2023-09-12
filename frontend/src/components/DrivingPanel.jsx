import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Controller from './Controller';
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
                <TextField
                    label='Wyślij wiadomość do robota'
                    color='success'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={sendWebSocketMessage}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant='contained' color='success' 
                    onClick={(_) => {
                        setMessage("Test message");
                        sendWebSocketMessage();
                    }}
                >
                    Wyślij wiadomość
                </Button>
            </Grid>
            <Grid item xs={12} md={12} className='movement-container'>
                <Grid container>
                    <Grid item xs={12} md={5} className='centered'>
                        <Controller />
                    </Grid>
                    <Grid item xs={0} md={7} className='movement-info'>
                        <div>
                            <p style={{ color: 'black' }}>
                                <strong>How to drive?</strong>
                            </p>
                            <p style={{ color: 'black' }}>
                                Gently move the circle on the left and the vehicle will move in the indicated direction.
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DrivingPanel;
