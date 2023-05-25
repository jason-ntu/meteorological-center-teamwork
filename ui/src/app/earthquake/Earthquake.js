import React from 'react';
import { Container, Typography } from '@mui/material';
import EarthquakeMaps from './Maps';
import useEarthquakeData from './useEarthquakeData';

const Earthquake = () => {

  const data = useEarthquakeData()

    return (
      <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
          地震
        </Typography>
        {data && <EarthquakeMaps data={data} />}
      </Container>
      </>
    );
  };
  
  export default Earthquake;