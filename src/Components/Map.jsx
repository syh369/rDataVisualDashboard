import React from 'react';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents, Marker, Popup } from 'react-leaflet';

function Map({neighborData, onRegionSelect}) {
  let neighborhoodData = neighborData;

  const tileURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
  const tileAttribute = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ';

  const [selectedRegion, setSelectedRegion] = useState(null);

  let neighborhoodFeatures = neighborhoodData.features;

  const defaultStyle = {
    fillOpacity: 0.1,
    color: 'blue',
    weight: 0
  };

  const selectedStyle = {
    fillOpacity: 0.5,
    color: 'green',
    weight: 1
  };

  function onEachneighborhood(neighborhood, layer) {

    const regionInfo = `${neighborhood.properties.borough} 
    ${neighborhood.properties.postalCode}: ${neighborhood.properties.PO_NAME}`;
 
    layer.bindPopup(regionInfo); 
    //console.log(neighborhoodBasicInfo);

    layer.on({
      mouseover: () => {
        layer.openPopup();
      },
      mouseout: () => {
        layer.closePopup();
      },
      click: () => {
        handleRegionClick(neighborhood, layer);
      },
    });
  }

  function handleRegionClick(neighborhood, layer) {
    // Unhighlight the previously selected region
    if (selectedRegion) {
      selectedRegion.layer.setStyle(defaultStyle);
    }
    // Highlight the selected region
    layer.setStyle(selectedStyle);

    // Update the selected region in the state
    setSelectedRegion({ neighborhood, layer });

    // You can pass the selected region to the parent component or perform other actions here
    // For example, call a function from props to update the autocomplete box
    onRegionSelect(neighborhood);
  }


  return (
    <MapContainer center={[40.754932, -73.984016]} zoom={11.5} style={{ height: '75vh', width: '50vw' }}>
      <TileLayer
        ext='png'
        url = {tileURL}
        attribution= {tileAttribute}
      />
      <GeoJSON  
        style={(feature) =>
          selectedRegion && selectedRegion.neighborhood === feature ? selectedStyle : defaultStyle
        } 
        data={neighborhoodFeatures}
        onEachFeature={onEachneighborhood}
      />
    </MapContainer>
  );
};

export default Map;