import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from "../Layout/Layout";
import {initializeApp} from "./App.slice";
import {store} from "../../state/store";

export function App(){
    store.dispatch(initializeApp);
    return (
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    )
}

