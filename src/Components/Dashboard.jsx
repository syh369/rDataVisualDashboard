// DummyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, TextField, Button, Autocomplete, Card, CardContent } from '@mui/material';

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

    const [selectedData, setSelectedData] = useState({
        zip_codes: '',
        total_number_of_covid: 0,
        //totalDeaths: 0,
        //totalRecovered: 0,
    });

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

    const handleLocationInputChange = (event, value) => {
        console.log("User selected a zipcode from option list: "+String(value));
        setAutocompleteInput(String(value));
    };

    // Simulate fetching data based on the input (replace with actual API call)
    const handleFetchData = () => {
        const apiEndpoint = `http://127.0.0.1:8000/areas?skip=0&limit=10&zip_codes=${encodeURIComponent(locationInput)}`;
            
        console.log(apiEndpoint)

        try{
            // Make the API call
            fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // Handle the response data and update the state
                setSelectedData(data[0]);
            })
        } catch (error) {
            console.log(error);
        } 
    };

    useEffect(() => {
        // Update the state when selectedRegion changes
        if (selectedRegion) {
            console.log("User clicked a region on the map and passed a zipcode: "+selectedRegion.properties.postalCode);
            setLocationInput(selectedRegion.properties.postalCode);
            //handleFetchData();
        }
      }, [selectedRegion]);

    return (
        <Grid container
              spacing={3}
              style={{ backgroundColor: '#ffffff', padding: '20px', width: '45vw'}} // Set the background color and padding
        >
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">COVID-19 Dashboard</Typography>
                </Paper>
            </Grid>

            <Grid item xs={8}>
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

            <Grid item xs={4}>
                <Button variant="contained" color="primary" onClick={handleFetchData}>
                Get Data
                </Button>
            </Grid>

            <Grid item xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Cases</Typography>
                            <Typography variant="body1">{selectedData.total_number_of_covid}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Median Household Income</Typography>
                            <Typography variant="body1">{0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Recovered</Typography>
                            <Typography variant="body1">
                                {0}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
};

export default Dashboard;
