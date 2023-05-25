import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const RealTimeGeneration = ({ data }) => {
  return (
    <Paper sx={{ p: 2, backgroundColor: '#191c24' }}>
      <Typography variant="h6" gutterBottom  sx={{ color: 'white' }} >
      實時產電量（萬瓩）
      </Typography>
      {data && <Doughnut data={{
          labels: ['北部', '西部', '南部', '東部'],
          datasets: [
            {
              data: [
                data.region.north.real_time_generation,
                data.region.west.real_time_generation,
                data.region.south.real_time_generation,
                data.region.east.real_time_generation,
              ],
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
            },
          ],
        }}

      />}
    </Paper>
  );
};

export default RealTimeGeneration;

