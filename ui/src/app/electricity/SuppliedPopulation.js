import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';


const SuppliedPopulation = ({ data }) => {
  return (
    <Paper sx={{ p: 2, backgroundColor: '#191c24' }}>
      <Typography variant="h6" gutterBottom  sx={{ color: 'white' }} >
        供應人數（萬）
      </Typography>
      {data && <Bar
        data={{
          labels: ['北部', '西部', '南部', '東部'],
          datasets: [
            {
              label: '供應人數（萬）',
              data: [
                data.region.north.supplied_population,
                data.region.west.supplied_population,
                data.region.south.supplied_population,
                data.region.east.supplied_population,
              ],
              borderWidth: 3,
              backgroundColor: ['#ff6384','#36a2eb', '#ffce56', '#4bc0c0'],
            },
          ],
        }}

        options={{
          legend: {
            display: false,
          },
        }}
      />}
    </Paper>
  );
};

export default SuppliedPopulation;
