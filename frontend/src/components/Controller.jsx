import React, { useState } from 'react';
import Draggable from 'react-draggable';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import '../App.css';

const Controller = () => {
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);

    const handleDrag = (event, data) => {
        console.log("Current position: ", data.x, data.y);
    }

    const handleStop = () => {
        setInitialPosition({ x: 0, y: 0 });
        setScale(1); // Reset the scale when dragging stops
    }

    return (
        <div className='movement-box'>
            <Draggable bounds="parent" onDrag={handleDrag} onStop={handleStop} position={initialPosition}>
                <div className='controller centered' style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)"
                }}>
                    <GamesOutlinedIcon className='icons'/>
                </div>
            </Draggable>
        </div>
    );
}

export default Controller;

