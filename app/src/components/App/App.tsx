import React, { useEffect } from 'react';
import {BrowserRouter, RouteObject} from "react-router-dom";
import {Layout} from "../Layout/Layout";
import {None} from "@hqoss/monads";
import {getOrReloadLanguage} from "../../services/localization";
import Home from '../Home/Home';
import { globalStore } from '../../store/globalStore';

function App() {
    let routes: RouteObject[] = [
        {
            path: '/', element: <Home/>, index: true
        },
        {
            path: '/react', element: <h1>Hello react</h1>
        }
    ];
    getOrReloadLanguage();
    const store = globalStore.app;

    useEffect(() => {store.loadAsync()}, [store]);
    return (
        <BrowserRouter>
            <Layout routes={routes} user={store.user} loading={store.isLoading}/>
        </BrowserRouter>
    );
}

export default App;
