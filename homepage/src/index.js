import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

ReactDOM.render(
  <BrowserRouter basename="/demo/corona-react-free/template/demo/preview">
    <App />
  </BrowserRouter>
, document.getElementById('root'));