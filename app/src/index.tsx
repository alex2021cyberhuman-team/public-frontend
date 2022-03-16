import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./components/App/App";
import { BrowserRouter } from 'react-router-dom';
import axiosSettings from "./services/conduitApi/axiosSettings";
import { globalStore } from './store/globalStore';

axiosSettings();
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App store={globalStore} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
