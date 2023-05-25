import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import ReservoirTable from './Table';
import useReservoirData from './useReservoirData';

function processReservoirData(data) {
  const reservoirNames = [
    "石門水庫",
    "寶山第二水庫",
    "永和山水庫",
    "鯉魚潭水庫",
    "德基水庫",
    "南化水庫",
    "曾文水庫",
    "烏山頭水庫",
  ];

  const processedData = {};

  for (const key in data) {
    const reservoirIndex = parseInt(key.substring(9));
    const reservoirName = reservoirNames[reservoirIndex];
    const amount = parseFloat(data[key].amount.replace(/,/g, ""));
    const percentage = parseFloat(data[key].percentage.replace("%", ""));

    processedData[reservoirName] = {
      amount,
      time: data[key].time,
      percentage,
    };
  }

  return processedData;
}


const Reservoir = () => {
    const data = useReservoirData()[0]
    const transformedData = processReservoirData(data)
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
          水情資訊
        </Typography>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {transformedData && <ReservoirTable data={transformedData} />}
      </Container>
    );
  };
  
  export default Reservoir;