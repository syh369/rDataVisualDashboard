import React from 'react'
import { Stack } from '@mui/material';

import Map from './Map';
import CovidDashboard from './CovidDashboard';
import WeatherDashboard from './WeatherDashboard';
import Dashboards from './Dashboards';

import nycNeighbordata from '.././Resource/nyc-zip-code-tabulation-areas-polygons.json';
import { useState } from 'react';


const UIStack = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
      <Stack direction="row" spacing={2}>
          <Map neighborData={nycNeighbordata} onRegionSelect={handleRegionSelect} />
          <Dashboards neighborData={nycNeighbordata} selectedRegion={selectedRegion}/>
      </Stack>
  )
}

export default UIStack