import React, { Component } from 'react';
export class Alarm extends Component {
  render() {
    return (
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th> Product Cost </th>
              <th> Project </th>
              <th> Payment Mode </th>
              <th> Start Date </th>
              <th> Payment Status </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> $14,500 </td>
              <td> Dashboard </td>
              <td> Credit card </td>
              <td> 04 Dec 2019 </td>
              <td>
                <div className="badge badge-outline-success">Approved</div>
              </td>
            </tr>
            <tr>
              <td> $14,500 </td>
              <td> Website </td>
              <td> Cash on delivered </td>
              <td> 04 Dec 2019 </td>
              <td>
                <div className="badge badge-outline-warning">Pending</div>
              </td>
            </tr>
            <tr>
              <td> $14,500 </td>
              <td> App design </td>
              <td> Credit card </td>
              <td> 04 Dec 2019 </td>
              <td>
                <div className="badge badge-outline-danger">Rejected</div>
              </td>
            </tr>
            <tr>
              <td> $14,500 </td>
              <td> Development </td>
              <td> Online Payment </td>
              <td> 04 Dec 2019 </td>
              <td>
                <div className="badge badge-outline-success">Approved</div>
              </td>
            </tr>
            <tr>
              <td> $14,500 </td>
              <td> Website </td>
              <td> Credit card </td>
              <td> 04 Dec 2019 </td>
              <td>
                <div className="badge badge-outline-success">Approved</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Alarm;