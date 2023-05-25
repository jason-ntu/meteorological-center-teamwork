import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';


const SuppliedPopulation = ({ data }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
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
            // {
            //   label: '供應人數（萬）',
            //   data: [
            //     data.region.north.supplied_population,
            //     data.region.west.supplied_population,
            //     data.region.south.supplied_population,
            //     data.region.east.supplied_population,
            //   ],
            //   borderWidth: 3,
            //   backgroundColor: ['#ff6384','#ff6384','#ff6384','#ff6384'], // , '#36a2eb', '#ffce56', '#4bc0c0'
            // },
            // {
            //   label: '人均用電量（瓦）',
            //   data: [
            //     data.region.north.avg_usage_per_person,
            //     data.region.west.avg_usage_per_person,
            //     data.region.south.avg_usage_per_person,
            //     data.region.east.avg_usage_per_person,
            //   ],
            //   borderWidth: 3,
            //   backgroundColor: ['#4bc0c0','#4bc0c0','#4bc0c0','#4bc0c0'], // '#ff6384', '#36a2eb', '#ffce56', 
            // },
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
