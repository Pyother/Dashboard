import React, { useState } from 'react';
import Draggable from 'react-draggable';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import '../App.css';

const Controller = () => {
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [is40Reached, setIs40Reached] = useState(false);
    let positionArray = [];

    const handleDrag = (event, data) => {
        if(!is40Reached && (Math.abs(data.x) >= 40 || Math.abs(data.y) >= 40)) {
            setIs40Reached(true);
            console.log("Reached 40");
        };
        if(is40Reached && (Math.abs(data.x) >= 40 || Math.abs(data.y) >= 40)) {
            positionArray.push(data.x, (-1)*data.y);
            //console.log("X = ", data.x, ", Y = ", data.y*(-1));
        }
        if(is40Reached && (Math.abs(data.x) < 40 && Math.abs(data.y) < 40)) {
            setIs40Reached(false);
            positionArray = [];
        }
    }

    const handleStop = () => {
        setInitialPosition({ x: 0, y: 0 });
        setScale(1);
    }

    return (
        <div className='movement-box'>
            <Draggable bounds="parent"
                onDrag={handleDrag}
                onStop={handleStop}
                position={initialPosition}>
                <div className='controller centered' style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)"
                }}>
                    <div style={{ padding: "1em", backgroundColor: "grey", borderRadius: "2em" }}>
                        <GamesOutlinedIcon className='icons' />
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

export default Controller;
