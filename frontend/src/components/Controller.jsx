import React from 'react';
import Draggable from 'react-draggable';
import '../App.css';

const Controller = () => {
    return (
        <div id="movement-box" style={{ width: "100%", height: "100%", border: "1px solid red", position: "relative" }}>
            <Draggable bounds="parent">
                <div style={{ color: "black", padding: "2em", borderRadius: "2em", backgroundColor: "wheat", width: "2em", }}>
                    X
                </div>
            </Draggable>
        </div>
    );
}

export default Controller;
