import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const Map = () => {

    useEffect(() => {
        // Tworzenie mapy przy użyciu OpenLayers
        const map = new OlMap({
            target: 'map', // ID kontenera, do którego dołączamy mapę
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        // Czyszczenie zasobów mapy przy odmontowywaniu komponentu
        return () => {
            map.setTarget(null);
        };
    }, []); // Ustawienie pustej tablicy zależności, aby efekt uruchomił się tylko raz po zamontowaniu

    return (
        <Grid container>
            <Grid item xs={12}>
                {/* Kontener mapy */}
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
            </Grid>
        </Grid>
    );
}

export default Map;