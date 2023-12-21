import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    AppBar,
} from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Import dashboard components
import CovidDashboard from './CovidDashboard';
import WeatherDashboard from './WeatherDashboard';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


const Dashboards = ({ neighborData, selectedRegion }) => {
    const [tabIndex, setTabIndex] = useState(0);
  
    const handleTabChange = (event, newIndex) => {
      setTabIndex(newIndex);
    };
  
    return (
      <Box style={{ background: '#f2f6fc', width: '50vw'}}>
        <AppBar position="relative" style={{background: 'inherit'}}>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="COVID-19 Data" 
                    sx={{
                        '&.Mui-selected': {
                            outline: 'none',
                        }
                    }}
                    {...a11yProps(0)}/>
                <Tab label="NYC Weather Data"
                    sx={{
                        '&.Mui-selected': {
                            outline: 'none',
                        }
                    }}
                    {...a11yProps(1)}/>
                {/* <Tab label="Bus Route" /> */}
            </Tabs>
        </AppBar>

        <TabPanel value={tabIndex} index={0}>
            <CovidDashboard
                    neighborData={neighborData}
                    selectedRegion={selectedRegion}
            />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
            <WeatherDashboard
                    neighborData={neighborData}
                    selectedRegion={selectedRegion}
            />
        </TabPanel>
      </Box>
    );
  };
  
  export default Dashboards;