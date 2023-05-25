import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';


const RealTimeUsageChart = ({ data }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        實時用電量（萬瓩）
      </Typography>
      {data && <Doughnut
        data={{
          labels: ['北部', '西部', '南部', '東部'],
          datasets: [
            {
              data: [
                data.region.north.real_time_usage,
                data.region.west.real_time_usage,
                data.region.south.real_time_usage,
                data.region.east.real_time_usage,
              ],
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
            },
          ],
        }}

        
      />}
    </Paper>
  );
};

export default RealTimeUsageChart;
