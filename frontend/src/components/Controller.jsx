import React, { useContext } from 'react';
import { Grid, IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import SouthIcon from '@mui/icons-material/South';
import { PositionContext } from '../App';
import '../App.css';

const Controller = () => {

    const { position, setPosition } = useContext(PositionContext);

    const handleButtonClick = ({ coords }) => {
        const positionArray = position;
        const lastPosition = positionArray[positionArray.length - 1];
        const newCoords = [
            lastPosition[0] + coords[0],
            lastPosition[1] + coords[1]
        ];
        positionArray.push(newCoords);
        setPosition(positionArray);
        console.log("Coords: ", coords);
        console.log("Current position: ", positionArray);
        localStorage.setItem('positionArray', JSON.stringify(positionArray));
    }

    return (
        <div className='movement-box'>
            <Grid container>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [-1, 1] })}}>
                        <NorthWestIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [0, 1] })}}>
                        <NorthIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [1, 1] })}}>
                        <NorthEastIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [-1, 0] })}}>
                        <WestIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    
                </Grid>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [1, 0] })}}>
                        <EastIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [-1, -1] })}}>
                        <SouthWestIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [0, -1] })}}>
                        <SouthIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4} md={4} className='controll-button centered'>
                    <IconButton onClick={(_) => {handleButtonClick({ coords: [1, -1] })}}>
                        <SouthEastIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default Controller;
