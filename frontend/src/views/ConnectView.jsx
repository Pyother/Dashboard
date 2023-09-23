import React, {useState} from 'react';
import { Grid, CircularProgress, Button  } from '@mui/material';

const ConnectView = () => {
    const [resquestProcessing, setRequestProcessing] = useState(false);  

    return(
        <div className="locked-backdrop">
            <div className="locked-modal">        
                <h1>Connection with API lost</h1>
                {
                    resquestProcessing ?
                    <>
                        <CircularProgress color='secondary'/>    
                        <p style={{paddingTop: "1em"}}>Reconnecting ...</p>
                    </> :
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={(_) => {
                            setRequestProcessing(true);
                        }}
                    >
                        Reconnect
                    </Button>
                }
            </div>
        </div> 
    );
}

export default ConnectView;
