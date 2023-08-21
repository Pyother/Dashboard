import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import '../App.css';

const StatisticsPanel = () => {
    const [messages, setMessages] = useState([]);
    const [rows, setRows] = useState([]);

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


    return (
        <Grid container style={{}}>
            <Grid item xs={12} md={12}>
                <h1>Area Explorer Dashboard</h1>
            </Grid>
            <Grid item xs={12} md={12} className='centered' style={{justifyContent: "left"}}>
                <p className='paragraph'>
                    <strong>Last message: </strong>{localStorage.getItem("lastMessage")}
                </p>
            </Grid>
            <Grid item xs={12} md={12} className='statistics'>
                <p className='paragraph'>
                    <strong>Statistics</strong>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-cell-head">Distance 0°</TableCell>
                                    <TableCell className="table-cell-head">Distance 45°</TableCell>
                                    <TableCell className="table-cell-head">Distance 90°</TableCell>
                                    <TableCell className="table-cell-head">Distance 135°</TableCell>
                                    <TableCell className="table-cell-head">Distance 180°</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        {row.map((cellValue, cellIndex) => (
                                            <TableCell key={cellIndex} className="table-cell-body">
                                                {cellValue}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </p>
            </Grid>
        </Grid>
    );
};

export default StatisticsPanel;
