import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import Controller from './Controller';
import '../App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const DrivingPanel = () => {
    const [socket, setSocket] = useState(null);

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
            // Sprawdź, czy WebSocket jest w stanie otwartym przed wysłaniem wiadomości
            socket.send('Hello World');
            
            // Dodaj event listener do nasłuchiwania odpowiedzi
            socket.addEventListener('message', (event) => {
                console.log('Received message from server:', event.data);
                // Tutaj możesz przetwarzać odpowiedź od serwera
            });
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Driving Panel</h1>
            </Grid>
            <Grid item xs={10} md={11.5} className='statistics centered'>
                <Button variant='contained' color='success' onClick={sendWebSocketMessage}>
                    Send WebSocket Message
                </Button>
            </Grid>
            <Grid item xs={12} md={12} className="movement-container">
                <Grid container>
                    <Grid item xs={12} md={5} className='centered'>
                        <Controller />
                    </Grid>
                    <Grid item xs={0} md={7} className='movement-info'>
                        <div>
                            <p style={{ color: "black" }}><strong>How to drive?</strong></p>
                            <p style={{ color: "black" }}>Gently move the circle on the left and the vehicle will move in the indicated direction.</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DrivingPanel;
