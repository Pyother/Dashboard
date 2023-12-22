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

            if(message.includes("Data_callback")) {
                console.log("Data Callback")
                const parts = message.split("|")
                const jsonString = parts[1].replace(/'/g, '"');
                
                try {
                    const jsonData = JSON.parse(jsonString);
                    console.log(jsonData);

                    const signalLevelString = localStorage.getItem('signalLevel') || '[]';
                    const megabitsUploadString = localStorage.getItem('megabitsUpload') || '[]';
                    const carbonMonoxideDensityString = localStorage.getItem('carbonMonoxideDensity') || '[]';
                    const methaneDensityString = localStorage.getItem('methaneDensity') || '[]';

                    const signalLevel = JSON.parse(signalLevelString);
                    const megabitsUpload = JSON.parse(megabitsUploadString);
                    const carbonMonoxideDensity = JSON.parse(carbonMonoxideDensityString);
                    const methaneDensity = JSON.parse(methaneDensityString);

                    // Speedtest:
                    if (
                        typeof jsonData["speedtest"]["signal_level"] === 'number' &&
                        typeof jsonData["speedtest"]["megabits_upload"] === 'number'
                    ) {
                        console.log("Proper speedtest data");
                        signalLevel.push(parseFloat(jsonData["speedtest"]["signal_level"]));
                        megabitsUpload.push(parseFloat(jsonData["speedtest"]["megabits_upload"]));
                        
                        localStorage.setItem("signalLevel", JSON.stringify(signalLevel));
                        localStorage.setItem("megabitsUpload", JSON.stringify(megabitsUpload));
                    }

                    // Carbon monoxide measurement:
                    if (
                        typeof jsonData["carbon_monoxide_measurement"]["density"] === 'number'
                    ) {
                        console.log("Proper data from carbon monoxide measurement");
                        carbonMonoxideDensity.push(parseFloat(jsonData["carbon_monoxide_measurement"]["density"]));

                        localStorage.setItem("carbonMonoxideDensity", JSON.stringify(carbonMonoxideDensity));
                    }

                    // Methane measurement:
                    if (
                        typeof jsonData["methane_measurement"]["density"] === 'number'
                    ) {
                        console.log("Proper data from methane measurement");
                        methaneDensity.push(parseFloat(jsonData["methane_measurement"]["density"]));

                        localStorage.setItem("methaneDensity", JSON.stringify(methaneDensity));
                    }
                    
                } catch (error) {
                    console.error("Błąd parsowania JSON:", error);
                }
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
