import React from 'react'
import { Stack } from '@mui/material';

import Map from './Map';
import Dashboard from './Dashboard';

import nycNeighbordata from '.././Resource/nyc-zip-code-tabulation-areas-polygons.json';
import { useState } from 'react';

const UIStack = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div>
        <Stack direction="row" spacing={2}>
            <Map neighborData={nycNeighbordata} onRegionSelect={handleRegionSelect} />
            <Dashboard neighborData={nycNeighbordata} selectedRegion={selectedRegion}/>
        </Stack>
    </div>
  )
}

export default UIStack