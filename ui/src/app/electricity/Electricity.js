import React , { useEffect, useState } from 'react';
// import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
import { Container, Grid, Paper, Typography } from '@mui/material';
import AverageUsageChart from './AverageUsageChart';
import RealTimeGeneration from './RealTimeGeneration';
import RealTimeUsageChart from './RealTimeUsageChart';
import useElectricityData from './useElectricityData'
import ElectricityTable from './Table';
import SuppliedPopulation from './SuppliedPopulation';

function parseNumber(text) {
  const numPart = text.match(/\d+(\.\d+)?/);
  if (!numPart) return text;
  return parseFloat(numPart[0]);
}

function transformData(data) {
  if (typeof data === undefined) {
    return undefined;
  }else if (typeof data === 'string') {
    return parseNumber(data);
  } else if (typeof data === 'object') {
    const transformed = {};
    for (const key in data) {
        if (key === 'update_time') {
            transformed[key] = data[key];
        } else {
            transformed[key] = transformData(data[key]);
        }
    }
    return transformed;
  } else {
    return data;
  }
}

const Electricity = () => {
  const data = useElectricityData()[0]
  const transformedData = transformData(data)

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        電力資訊
      </Typography>
      <Grid container spacing={2}>
        {data && <Grid item xs={12}>
          <ElectricityTable data={data} />
        </Grid>}
        {transformedData && <Grid item xs={6}>
            <RealTimeUsageChart data={transformedData} />
        </Grid>}
        {transformedData && <Grid item xs={6}>
            <RealTimeGeneration data={transformedData} />
        </Grid>}
        {transformedData && <Grid item xs={6}>
            <SuppliedPopulation data={transformedData} />
        </Grid>}
        {transformedData && <Grid item xs={6}>
            <AverageUsageChart data={transformedData} />
        </Grid>}
      </Grid>
    </Container>
  );
};

export default Electricity;


