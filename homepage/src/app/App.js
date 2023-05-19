import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';


class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="content">
        <table className="table">
          <thead>
            <tr>
              <th> Reservoir </th>
              <th> </th>
              <th> Earthquake </th>
              <th> </th>
              <th> Electricity</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="badge badge-outline-low">Low Risk</div>
              </td>
              <td> some text some text some text some text some text... </td>
              <td>
                <div className="badge badge-outline-medium">Medium Risk</div>
              </td>
              <td> some text some text some text some text some text... </td>
              <td>
                <div className="badge badge-outline-high">High Risk</div>
              </td>
              <td> some text some text some text some text some text... </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(App);
