import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';


const AverageUsageChart = ({ data}) => {

  return (
    <Paper sx={{ p: 2, backgroundColor: '#191c24'}}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white' }} >
        人均用電量（瓦）
      </Typography>
      {data && <Bar
        data={{
          labels: ['北部', '西部', '南部', '東部'],
          datasets: [
            {
              data: [
                data.region.north.avg_usage_per_person,
                data.region.west.avg_usage_per_person,
                data.region.south.avg_usage_per_person,
                data.region.east.avg_usage_per_person,
              ],
              borderWidth: 3,
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
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

export default AverageUsageChart;
