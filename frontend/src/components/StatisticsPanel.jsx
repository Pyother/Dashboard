import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab } from '@mui/material';
import WiFiChart from './WiFiChart';
import '../App.css';

const StatisticsPanel = () => {
    const [messages, setMessages] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentChart, setCurrentChart] = useState(0);

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

            if(message.includes("Data_callback")) {
                console.log("Data Callback")
                const parts = message.split("|")
                const jsonString = parts[1].replace(/'/g, '"');
                
                try {
                    const jsonData = JSON.parse(jsonString);
                    console.log(jsonData);
                    localStorage.setItem("data", jsonData);
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
                        <Tab label="Gases"/>
                        <Tab label="Map"/>
                    </Tabs>
                </Grid>
                {
                    currentChart === 0 ? 
                    <WiFiChart/> :
                    <></>
                }
            </Grid>
        </Grid>
    );
};

export default StatisticsPanel;
