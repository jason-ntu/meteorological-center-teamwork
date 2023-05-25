import React from 'react';
import { Table } from 'react-bootstrap';

function ElectricityTable({ data }) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">電力資訊</h4>
          <div className="table-responsive">
          <Table>
              <thead>
                  <tr>
                      <th>Region</th>
                      <th>Supplied Population</th>
                      <th>Real Time Generation</th>
                      <th>Average Usage Per Person</th>
                      <th>Real Time Usage</th>
                      <th>Estimated Supply</th>
                  </tr>
              </thead>
              <tbody>
                  {/* 確保 data 有值再顯示 */}
                  {data && Object.keys(data.region).map((regionKey) => {
                      const region = data.region[regionKey];
                      return (
                          <tr key={regionKey}>
                              <td>{regionKey}</td>
                              <td>{region.supplied_population}</td>
                              <td>{region.real_time_generation}</td>
                              <td>{region.avg_usage_per_person}</td>
                              <td>{region.real_time_usage}</td>
                              <td>{region.estimated_supply}</td>
                          </tr>
                      );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    更新時間：{data.update_time}
                  </td>
                </tr>
              </tfoot>
          </Table>
          </div>
        </div>
      </div>
    );
}

export default ElectricityTable;
