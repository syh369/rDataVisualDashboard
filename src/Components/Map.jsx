import React from 'react';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents, Marker, Popup } from 'react-leaflet';

function Map({neighborData, onRegionSelect}) {
  let neighborhoodData = neighborData;

  const [selectedRegion, setSelectedRegion] = useState(null);

  let neighborhoodFeatures = neighborhoodData.features;

  const defaultStyle = {
    fillOpacity: 0.1,
    color: 'blue',
    weight: 0.5
  };

  const selectedStyle = {
    fillOpacity: 0.5,
    color: 'green',
    weight: 2
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


  // function LocationMarker() {
  //   const [position, setPosition] = useState(null)
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, 13)
  //     },
  //   })
  
  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   )
  // }

  return (
    <MapContainer center={[40.754932, -73.984016]} zoom={11.5} style={{ height: '70vh', width: '45vw' }}>
      <TileLayer
        ext='png'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}'
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON  
        style={(feature) =>
          selectedRegion && selectedRegion.neighborhood === feature ? selectedStyle : defaultStyle
        } 
        data={neighborhoodFeatures}
        onEachFeature={onEachneighborhood}
      />
      {/* <LocationMarker /> */}
    </MapContainer>
  );
};

export default Map;