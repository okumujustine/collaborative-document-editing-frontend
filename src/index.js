import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import App from './App';
import store from "./redux/store"

import "./styles/index.css"
import "./styles/custom.css"

const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
