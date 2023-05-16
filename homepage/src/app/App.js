import React, { Component, Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';

import Spinner from '../app/Spinner';

const Alarm = lazy(() => import('./alarm'));

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="main-panel">
        <div className="content-wrapper">
          <Suspense fallback={<Spinner />}>
            <Alarm />
          </Suspense>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
