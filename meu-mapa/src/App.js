// src/App.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const App = () => {
  const [informacao, setInformacao] = useState(null);

  const geojsonData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "cuidados": "Revegetação com espécies nativas"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-48.503056, -1.455833],
              [-48.503056, -1.405833],
              [-48.553056, -1.405833],
              [-48.553056, -1.455833],
              [-48.503056, -1.455833]
            ]
          ]
        }
      }
    ]
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.on({
        click: () => {
          setInformacao(feature.properties);
        }
      });
    }
  };

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Mapa de Áreas Degradadas
          </Typography>
          <IconButton color="inherit">
            <InfoIcon />
          </IconButton>
          <IconButton color="inherit">
            <MapIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className="main">
        <MapContainer center={[-1.455833, -48.503056]} zoom={7} className="mapContainer">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
        </MapContainer>
        <div className="sidebar">
          {informacao ? (
            <div className="info">
              <Typography variant="h6">Informações da Área</Typography>
              <Typography variant="body1"><strong>Cuidados recomendados:</strong> {informacao.cuidados}</Typography>
            </div>
          ) : (
            <Typography variant="body1">Clique em uma área no mapa para ver os detalhes.</Typography>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
