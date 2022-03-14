import React from 'react';
import {BrowserRouter, RouteObject} from "react-router-dom";
import {Layout} from "../Layout/Layout";
import {None} from "@hqoss/monads";
import {getOrReloadLanguage} from "../../services/localization";

function App() {
    let routes: RouteObject[] = [
        {
            path: '/', element: <h1>Hello world</h1>, index: true
        },
        {
            path: '/react', element: <h1>Hello react</h1>
        }
    ];
    getOrReloadLanguage();
    return (
        <BrowserRouter>
            <Layout routes={routes} user={None} loading={false}/>
        </BrowserRouter>
    );
}

export default App;
