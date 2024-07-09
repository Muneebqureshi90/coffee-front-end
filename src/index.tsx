import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-app-polyfill/stable'; // Import the polyfill package
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import reportWebVitals from './reportWebVitals';

// Define a type for global with an index signature

// Add the following line to polyfill the 'url' module


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
