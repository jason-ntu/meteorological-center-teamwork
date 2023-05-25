import React from 'react';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ReservoirTable = ({ data }) => {
    return (
      <div className="card">
        <div className="card-body">
          {/* <h4 className="card-title">水庫</h4> */}
          <div className="table-responsive">
          <Table>
            <thead>
              <tr>
                <th>名稱</th>
                <th>有效蓄水量</th>
                <th>蓄水量 %</th>
                <th>更新時間</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                Object.keys(data).map((reservoirName) => {
                  const reservoir = data[reservoirName];
                  let variant;
                  if (reservoir.percentage < 30) { // 蓄水量小於 30% 顯示紅色
                    variant = 'danger';
                  } else if (reservoir.percentage < 50) { // 蓄水量小於 50% 顯示橘色
                    variant = 'warning';
                  }
                  return (
                    <tr key={reservoirName}>
                      <td style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{reservoirName}</td>
                      <td>{reservoir.amount}</td>
                      <td>
                        <ProgressBar now={reservoir.percentage} label={`${reservoir.percentage} %`} style={{ minWidth: '350px', height: '20px', fontSize: '0.8rem'}} variant={variant} />
                      </td>
                      <td>{reservoir.time}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

        </div>
      </div>
    </div>
    );
};

export default ReservoirTable;
