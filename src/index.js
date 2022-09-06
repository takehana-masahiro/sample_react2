import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppSecond from './AppSecond';
import reportWebVitals from './reportWebVitals';

import AmplifyCore from '@aws-amplify/core';
import config from './aws-exports';

const user = AmplifyCore.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppSecond user={user}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
