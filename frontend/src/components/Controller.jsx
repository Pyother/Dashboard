import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import SouthIcon from '@mui/icons-material/South';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import '../App.css';

const Controller = () => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new W3CWebSocket('ws://localhost:8000/ws/dashboard/');
        newSocket.addEventListener('open', () => {
            console.log('WebSocket connected');
            setSocket(newSocket);
        });

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const sendWebSocketMessage = (message) => {
        if (socket && socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify({ message }));
        } else {
            console.error('WebSocket is not connected or is not open.');
        }
    }

    const handleButtonClick = ({ coords, direction }) => {
        const positionArray = JSON.parse(localStorage.getItem('positionArray')) || [{ x: 0, y: 0}];
        const lastPosition = positionArray[positionArray.length - 1];
        const newCoords = {
            x: lastPosition['x'] + coords[0],
            y: lastPosition['y'] + coords[1]
        };
        positionArray.push(newCoords);
        localStorage.setItem('positionArray', JSON.stringify(positionArray));
        sendWebSocketMessage('drive:' + direction);
    }

    return (
        <div className='movement-box'>
            <Grid container>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'>
                        <IconButton disabled={true} onClick={(_) => {handleButtonClick({ coords: [-1, 1], direction: 'northwest' })}}>
                            <NorthWestIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'>
                        <IconButton onClick={(_) => {handleButtonClick({ coords: [0, 1], direction: 'north' })}}>
                            <NorthIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'>
                        <IconButton disabled={true} onClick={(_) => {handleButtonClick({ coords: [1, 1], direction: 'northeast' })}}>
                            <NorthEastIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'>
                        <IconButton disabled={true} onClick={(_) => {handleButtonClick({ coords: [-1, -1], direction: 'southwest' })}}>
                            <SouthWestIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'>
                        <IconButton onClick={(_) => {handleButtonClick({ coords: [0, -1], direction: 'south' })}}>
                            <SouthIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'>
                        <IconButton disabled={true} onClick={(_) => {handleButtonClick({ coords: [1, -1], direction: 'southeast' })}}>
                            <SouthEastIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Controller;
