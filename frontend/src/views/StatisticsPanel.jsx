import React, { useState, useEffect, useContext } from 'react';
import { Grid, Tabs, Tab, Tooltip, Chip } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import WiFiChart from '../components/WiFiChart';
import DangerousFactorsChart from '../components/DangerousFactorsChart';
import { IsMobileContext } from '../App';
import '../App.css';
import PositionChart from '../components/PositionChart';

const StatisticsPanel = () => {
    const [messages, setMessages] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentChart, setCurrentChart] = useState(0);
    const { isMobile } = useContext(IsMobileContext);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/dashboard/');

        socket.onopen = function (event) {
            console.log("WebSocket connection opened");
            socket.send("Test message");
        };

        socket.onmessage = function (event) {
            const message = event.data;
            console.log("Received message:", message);
            localStorage.setItem("lastMessage", message);
            
            if (message !== "Start") {
                const newRow = message.split(" ");
                setRows(prevRows => [...prevRows, newRow]);
            }

            if(message.includes("density_measurement_callback")) {
                const densityArray = JSON.parse(localStorage.getItem('density')) || [];
                const data = {
                    density: parseFloat(message.split("|")[1]),
                    time: new Date().toLocaleTimeString()
                }
                densityArray.push(data);
                localStorage.setItem('density', JSON.stringify(densityArray));
            }
            
            if(message.includes("wifi_measurement_callback")) {
                const wifiArray = JSON.parse(localStorage.getItem('wifi')) || [];
                const positionArray = JSON.parse(localStorage.getItem('positionArray')) || [];
                const currentPosition = positionArray.length > 0 ? positionArray[positionArray.length - 1] : null;
                const data = {
                    signal_level: parseFloat(message.split(":")[1]),
                    ssid: (message.split("|")[1]).split(":")[0],
                    time: new Date().toLocaleTimeString(),
                    position: currentPosition
                }
                wifiArray.push(data);
                localStorage.setItem('wifi', JSON.stringify(wifiArray));
            }

            updatePage(message);
        };

        socket.onclose = function (event) {
            console.log("WebSocket connection closed");
        };

        socket.onerror = function (event) {
            console.error("WebSocket error:", event);
        };

        return () => {
            socket.close();
        };
    }, []);

    const updatePage = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const handleChartChange = (event, newValue) => {
        setCurrentChart(newValue);
    } 

    return (
        <Grid container style={{}}>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Dashboard</h1>
            </Grid>
            <Grid item xs={12} md={12} className='statistics-panel'>
                <Grid container>
                    <Tabs 
                        value={currentChart} 
                        onChange={handleChartChange} 
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab label="WiFi"/>
                        <Tab label="Position"/>
                        <Tab label="Dangerous factors"/>
                    </Tabs>
                </Grid>
                {
                    currentChart === 0 ? 
                    <WiFiChart/> : 
                    currentChart === 1 ?
                    <PositionChart/> : 
                    currentChart === 2 ?
                    <DangerousFactorsChart/> :
                    <></>
                }
            </Grid>
            {
                isMobile ?
                <></> :
                <Tooltip
                    title="Device connected"
                    arrow={true}
                >
                    <Chip
                        label="Connection status"
                        variant="outlined"
                        className="status"
                        style={{
                            color: 'white',
                            backgroundColor: '#263238'
                        }}
                        icon={
                            <CircleIcon 
                                fontSize='small' 
                                style={{color: 'green'}}
                            />
                        }
                    />
                </Tooltip>
            }
        </Grid>
    );
};

export default StatisticsPanel;
