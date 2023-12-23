import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import SouthIcon from '@mui/icons-material/South';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import '../App.css';

const Controller = () => {

    const [socket, setSocket] = useState(null);
    const [drivingDirection, setDrivingDirection] = useState({
        direction: null,
        active: false,
    });

    const handleTimeout = () => {
        setTimeout(() => {
            setDrivingDirection({
              direction: null,
              active: false
            });
          }, 250);
    }

    useEffect(() => {
        const pressedKeys = {
            37: false,
            38: false,
            39: false,
            40: false
        };

        let timeoutId = null;
      
        const handleKeyClick = (event) => {
          const keyCode = event.keyCode || event.which;
          pressedKeys[keyCode] = true; 
      
          if (pressedKeys[37] && pressedKeys[38]) {
            handleButtonClick({ coords: [-1, 1], direction: 'northwest' });
            setDrivingDirection({
                direction: "northwest",
                active: true
            });
          }
          if (pressedKeys[39] && pressedKeys[38]) {
            handleButtonClick({ coords: [1, 1], direction: 'northeast' });
            setDrivingDirection({
                direction: "northeast",
                active: true
            });
          }
          if (pressedKeys[37] && pressedKeys[40]) {
            handleButtonClick({ coords: [-1, -1], direction: 'southwest' });
            setDrivingDirection({
                direction: "southwest",
                active: true
            });
          }
          if (pressedKeys[39] && pressedKeys[40]) {
            handleButtonClick({ coords: [1, -1], direction: 'southeast' });
            setDrivingDirection({
                direction: "southeast",
                active: true
            });
          }
          if (pressedKeys[38] && !pressedKeys[37] && !pressedKeys[39]) {
            handleButtonClick({ coords: [0, 1], direction: 'north' });
            setDrivingDirection({
                direction: "north",
                active: true
            });
          }
          if (pressedKeys[40] && !pressedKeys[37] && !pressedKeys[39]) {
            handleButtonClick({ coords: [0, -1], direction: 'south' });
            setDrivingDirection({
                direction: "south",
                active: true
            });
          }

          if (timeoutId) {
            clearTimeout(timeoutId); 
          }
      
          timeoutId = setTimeout(() => {
            setDrivingDirection({
              direction: null,
              active: false
            });
          }, 250);
        }
      
        const handleKeyUp = (event) => {
          const keyCode = event.keyCode || event.which;
          pressedKeys[keyCode] = false; 
        }
      
        window.addEventListener('keydown', handleKeyClick);
        window.addEventListener('keyup', handleKeyUp);
      
        return () => {
          window.removeEventListener('keydown', handleKeyClick);
          window.removeEventListener('keyup', handleKeyUp);
        }
      }, []);

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
                    <Grid container className='controll-button centered'
                        style={{
                            boxShadow: 
                            (drivingDirection.direction === 'northwest' && 
                            drivingDirection.active === true) ?
                            "#7b1fa2 0px 5px 15px" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            transition: "box-shadow 0.5s linear" 
                        }}
                    >
                        <IconButton onClick={(_) => {
                                handleButtonClick({ coords: [-10.5, 17], direction: 'northwest' });
                                setDrivingDirection({
                                    direction: "northwest",
                                    active: true
                                });
                                handleTimeout();
                            }}>
                            <NorthWestIcon 
                                style={{
                                    color: 
                                    (drivingDirection.direction === 'northwest' && 
                                    drivingDirection.active === true) ? '#9c27b0' : 'white'
                                }}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'
                        style={{
                            boxShadow: 
                            (drivingDirection.direction === 'north' && 
                            drivingDirection.active === true) ?
                            "#7b1fa2 0px 5px 15px" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            transition: "box-shadow 0.5s linear" 
                        }}
                    >
                        <IconButton onClick={(_) => {
                                handleButtonClick({ coords: [0, 20], direction: 'north' });
                                setDrivingDirection({
                                    direction: "north",
                                    active: true
                                });
                                handleTimeout();
                            }}>
                            <NorthIcon 
                                style={{
                                    color: 
                                    (drivingDirection.direction === 'north' && 
                                    drivingDirection.active === true) ? '#9c27b0' : 'white'
                                }}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'
                        style={{
                            boxShadow: 
                            (drivingDirection.direction === 'northeast' && 
                            drivingDirection.active === true) ?
                            "#7b1fa2 0px 5px 15px" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            transition: "box-shadow 0.5s linear" 
                        }}
                    >
                        <IconButton onClick={(_) => {
                                handleButtonClick({ coords: [10.5, 17], direction: 'northeast' });
                                setDrivingDirection({
                                    direction: "northeast",
                                    active: true
                                });
                                handleTimeout();
                            }}>
                            <NorthEastIcon 
                                style={{
                                    color: 
                                    (drivingDirection.direction === 'northeast' && 
                                    drivingDirection.active === true) ? '#9c27b0' : 'white'
                                }}
                            />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'
                        style={{
                            boxShadow: 
                            (drivingDirection.direction === 'southwest' && 
                            drivingDirection.active === true) ?
                            "#7b1fa2 0px 5px 15px" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            transition: "box-shadow 0.5s linear" 
                        }}
                    >
                        <IconButton onClick={(_) => {
                                handleButtonClick({ coords: [-10.5, -17], direction: 'southwest' });
                                setDrivingDirection({
                                    direction: "southwest",
                                    active: true
                                });
                                handleTimeout();
                            }}>
                            <SouthWestIcon 
                                style={{
                                    color: 
                                    (drivingDirection.direction === 'southwest' && 
                                    drivingDirection.active === true) ? '#9c27b0' : 'white',
                                }}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'
                        style={{
                            boxShadow: 
                            (drivingDirection.direction === 'south' && 
                            drivingDirection.active === true) ?
                            "#7b1fa2 0px 5px 15px" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            transition: "box-shadow 0.5s linear" 
                        }}
                    >
                        <IconButton onClick={(_) => {
                                handleButtonClick({ coords: [0, -20], direction: 'south' });
                                setDrivingDirection({
                                    direction: "south",
                                    active: true
                                });
                                handleTimeout();
                            }}>
                            <SouthIcon 
                                style={{
                                    color: 
                                    (drivingDirection.direction === 'south' && 
                                    drivingDirection.active === true) ? '#9c27b0' : 'white',
                                }}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button-container'>
                    <Grid container className='controll-button centered'
                        style={{
                            boxShadow: 
                            (drivingDirection.direction === 'southeast' && 
                            drivingDirection.active === true) ?
                            "#7b1fa2 0px 5px 15px" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            transition: "box-shadow 0.5s linear" 
                        }}
                    >
                        <IconButton onClick={(_) => {
                                handleButtonClick({ coords: [10.5, -17], direction: 'southeast' });
                                setDrivingDirection({
                                    direction: "southeast",
                                    active: true
                                });
                                handleTimeout();
                            }}>
                            <SouthEastIcon 
                                style={{
                                    color: 
                                    (drivingDirection.direction === 'southeast' && 
                                    drivingDirection.active === true) ? '#9c27b0' : 'white',
                                }}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Controller;
