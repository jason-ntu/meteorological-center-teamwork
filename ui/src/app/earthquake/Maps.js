import React from 'react';
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { Grid } from '@mui/material';
import { Table } from 'react-bootstrap';

function convertDataToGeoPoints(data, factories) {
  const geoPoints = data.map(item => {
    const latlng = item.geopoint.replace('北緯', '').replace('東經', '').split(',').map(Number);
    const pointLatLng = L.latLng(latlng[0], latlng[1]);
    const distances = factories.map(factory => {
      const factoryLatLng = L.latLng(factory.latitude, factory.longitude);
      const distance = pointLatLng.distanceTo(factoryLatLng) / 1000; // 公里
      return { factory: factory.name, distance };
    });
    return {...item, latlng, distances};
  });
  return geoPoints;
}

function EarthquakeMaps({data}) {
  const factories = [ // tsmc 廠房資訊
  { name: '竹', longitude: 121.01, latitude: 24.773, si: 1.758, padj: 1.0 },
  { name: '中', longitude: 120.618, latitude: 24.2115, si: 1.063, padj: 1.0 },
  { name: '南', longitude: 120.272, latitude: 23.1135, si: 1.968, padj: 1.0 },
];
  const geoPoints = convertDataToGeoPoints(data, factories);
  const defaultIcon = new L.Icon.Default({
    iconSize: [18.75, 30.75], // 75% of the original size
    iconAnchor: [9.375, 30.75], // Ensure the icon is anchored correctly
    popupAnchor: [1, -30.75] // Ensure the popup shows correctly
  });

  return (
    <>
    <Grid container spacing={2}>
        <Grid item xs={12}>
        <div className="card">
        <div className="card-body">
          <h4 className="card-title">近期地震</h4>
          <div className="table-responsive">
            <Table>
                  <thead>
                    <tr>
                      <th>地點</th>
                      <th>深度</th>
                      {/* <th>經緯度</th> */}
                      <th>規模</th>
                      <th>強度</th>
                      <th>時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((quake, index) => (
                      <tr key={index}>
                        <td>{quake.location}</td>
                        <td>{quake.depth}</td>
                        {/* <td>{quake.geopoint}</td> */}
                        <td>{quake.scale}</td>
                        <td>{quake.magnitude}</td>
                        <td>{quake.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
            </div>
            </div>
        </Grid>
        

        <Grid item xs={6}>
        <Map center={[23.7, 121]} zoom={7} style={{ height: "50vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      {geoPoints.map((point, index) => (
        <CircleMarker key={index} center={point.latlng} radius={10} fillColor="red" color="red" fillOpacity={1}>
          <Popup>
            <div>
              <h2>{point.location}</h2>
              <p>{point.time}</p>
              <p>深度: {point.depth}</p>
              <p>規模: {point.scale}</p>
              <p>震級: {point.magnitude}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {factories.map(factory => (
        <Marker key={factory.name} position={[factory.latitude, factory.longitude]} icon={defaultIcon}>
          <Popup>
            <div>
              <h2>tsmc: {factory.name}</h2>
              <p>SI: {factory.si}</p>
              <p>Padj: {factory.padj}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      </Map>
        </Grid>

        <Grid item xs={6}>
        <div className="card">
        <div className="card-body">
          <h4 className="card-title">與各廠區之距離</h4>
          <div className="table-responsive">
        <Table>
        <thead>
        <tr>
            <td>地震</td>
            <td align="right">距離 竹</td>
            <td align="right">距離 中</td>
            <td align="right">距離 南</td>
        </tr>
        </thead>
        <tbody>
        {geoPoints.map((point, i) => (
          <tr key={i}>
            <td>{point.location}</td>
            <td align="right">{point.distances[0].distance.toFixed(0)} km</td>
            <td align="right">{point.distances[1].distance.toFixed(0)} km</td>
            <td align="right">{point.distances[2].distance.toFixed(0)} km</td>
        </tr>
        ))}
        </tbody>
    </Table>
    </div>
    </div>
    </div>
        </Grid>

    </Grid>
    </>
  );

}

export default EarthquakeMaps;
