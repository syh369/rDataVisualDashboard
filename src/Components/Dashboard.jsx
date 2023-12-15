// DummyDashboard.jsx
import React, { useState, useEffect } from 'react';
import {    Container,
            Typography, 
            Paper, 
            Grid, 
            TextField, 
            Button, 
            Autocomplete, 
            Snackbar,
            CircularProgress, 
            Tooltip } from '@mui/material';

const Dashboard = ({neighborData, selectedRegion}) => {

    let neighborFeatures = neighborData.features;

    //console.log(neighborFeatures);

    // Create an empty object to store unique zipcodes as keys
    const neighborhoodBasicInfo = [];

    const zipcodeSet = new Set();

    // Map neighborData into features array
    neighborFeatures.map((feature) => {
        const zipcode = feature.properties.postalCode;

        if (!zipcodeSet.has(zipcode)) {
            // Add the zipcode to the set to mark it as seen
            zipcodeSet.add(zipcode);
            // Add the entry to the array
            neighborhoodBasicInfo.push({zipcode:zipcode,
                                        feature:feature});
          }
    });

    //console.log("DEBUG HERE ===========================");
    //console.log(neighborhoodBasicInfo.map((entry) => {return entry.zipcode}));

    const [selectedData, setSelectedData] = useState({});

    // //dummy data
    // const updated_data = {
    //     zip_codes: '10024',
    //     total_number_of_covid: 12,
    //     //totalDeaths: 15,
    //     //totalRecovered: 21,
    // }

    // Handle the change of input address by user
    const [locationInput, setLocationInput] = useState('');
    const [autocompleteInput, setAutocompleteInput] = useState('');

    // Handle the loading effects
    const [loading, setLoading] = useState(false);

    // Handle date state selection
    const [selectedDate, setSelectedDate] = useState("");

    // Handle undefined data fetch notification
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    const handleLocationInputChange = (event, value) => {
        console.log("User selected a zipcode from option list: "+String(value));
        setAutocompleteInput(value);
    };

    // Simulate fetching data based on the input (replace with actual API call)
    const handleFetchData = () => {
        setLoading(true);
        
        const apiEndpoint = `http://127.0.0.1:8000/covid/zipcode_dates/?date=${encodeURIComponent(selectedDate)}&zip_code=${encodeURIComponent(autocompleteInput)}`;
            
        console.log(apiEndpoint)

        try{
            // Make the API call
            fetch(apiEndpoint)
                .then((response) => response.json())
                .then(
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000)
                )
                .then((data) => {
                    if (data.length > 0) {
                        console.log("Fetched Result: "+ data);
                        setSelectedData(data[0]);
                    } else {
                        setSnackbarOpen(true);
                    }
                })
        } catch (error) {
            console.log(error);
            setLoading(true);
        } 
    };

    useEffect(() => {
        // Update the state when selectedRegion changes
        if (selectedRegion) {
            console.log("User clicked a region on the map and passed a zipcode: "+selectedRegion.properties.postalCode);
            setLocationInput(selectedRegion.properties.postalCode);
            setAutocompleteInput(selectedRegion.properties.postalCode);
            //handleFetchData();
        }
      }, [selectedRegion]);

    return (
        <Container style={{ background: '#f2f6fc' }}>
            <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Typography variant="h6">COVID-19 Dashboard</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            id="autocomplete-address-bar"
                            // calling the freeSolo prop inside the Autocomplete component
                            freeSolo
                            options={neighborhoodBasicInfo.map((entry) => {return String(entry.zipcode)})}
                            //getOptionLabel={(info) => info.label.BOROUGH+" "+info.label.GEOCODE+": "+info.label.GEONAME}
                            value={locationInput}
                            onChange={handleLocationInputChange}
                            renderInput={(params) => <TextField {...params} 
                                        label="Enter a zipcode"
                                        fullWidth />}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Tooltip title="Select Date" arrow>
                            <TextField
                                id="date"
                                label="Select a Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                variant="outlined"
                            />
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" 
                                color="primary" 
                                onClick={handleFetchData}
                                disabled={!selectedDate}>
                        Get Data
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        {loading && <CircularProgress color="primary"/>}
                    </Grid>
                </Grid>
            </Paper>
            
            {!loading && (
                <Paper  elevation={3} style={{ padding: 20 }}>
                    {Object.entries(selectedData).map(([title, data]) => (
                        <Grid container spacing={2} key={title}>
                            <Grid item xs={6}>
                                <Typography variant="body1" style={{alignContent:'left', color : '#000000'}}>{String(title)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data}</Typography>
                            </Grid>
                        </Grid>
                    ))}

                    <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                    message="No data returned from the API."
                    severity="warning"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    />
                </Paper>
                
            )}

            
        </Container>
    );
};

export default Dashboard;
