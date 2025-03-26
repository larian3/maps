import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = ({ setInformacao }) => {
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

  // Função para adicionar eventos de clique a cada camada GeoJSON
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
    <MapContainer center={[-1.455833, -48.503056]} zoom={7} style={{ height: '500px', width: '70%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default Mapa;
