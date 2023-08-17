import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import '../App.css';

const HomeView = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/dashboard/');

        socket.onopen = function(event) {
            console.log("WebSocket connection opened");
            socket.send("Test message");
        };

        socket.onmessage = function(event) {
            const message = event.data;
            console.log("Received message:", message);
            updatePage(message);
        };

        socket.onclose = function(event) {
            console.log("WebSocket connection closed");
        };

        socket.onerror = function(event) {
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
        <div>
            <div>
                <Navigation />
            </div>
        </div>
    );
}

export default HomeView;
