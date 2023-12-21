import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  TextField,
  Button,
  Autocomplete,
  Snackbar,
  CircularProgress,
  Tooltip,
} from '@mui/material';

const WeatherDashboard = () => {
  // Dummy data for autocomplete options
  const locations = [
    { label: 'New York, NY' },
    { label: 'Brooklyn, NY' },
    { label: 'Queens, NY' },
    // Add more locations as needed
  ];

  // State for selected location and date
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Dummy data for weather information
  const weatherData = {
    temperature: 72,
    condition: 'Sunny',
    // Add more weather data as needed
  };

  // Function to handle button click
  const handleFetchData = () => {
    // You can perform API call here in the future
    console.log('Fetching data for:', selectedLocation, selectedDate);
    // For now, you can just log the selected location and date
  };

  return (
    <Box style={{ background: '#f2f6fc' }}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={0} style={{ padding: '20px' }}>
                        <Typography variant="h6">NYC Weather Dashboard</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Autocomplete
                        options={locations}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Location"
                            fullWidth
                            onChange={(e, value) => setSelectedLocation(value)}
                        />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="date"
                        label="Select Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleFetchData}>
                        Fetch Data
                    </Button>
                </Grid>
            </Grid>
        </Paper>
      {/* Additional UI elements for displaying weather data */}
      {selectedLocation && selectedDate && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Weather Information
          </Typography>
          <Typography variant="body1">
            Location: {selectedLocation.label}
          </Typography>
          <Typography variant="body1">Date: {selectedDate}</Typography>
          <Typography variant="body1">
            Temperature: {weatherData.temperature}°F
          </Typography>
          <Typography variant="body1">
            Condition: {weatherData.condition}
          </Typography>
          {/* Add more weather information as needed */}
        </Paper>
      )}
    </Box>
  );
};

export default WeatherDashboard;
