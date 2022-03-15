import { useEffect } from 'react';
import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../Layout/Layout";
import { globalStore } from '../../store/globalStore';
import { observer } from 'mobx-react-lite';
import Home from '../Home/Home';

export default observer(() => {
    const store = globalStore.app;
    useEffect(() => {store.loadAsync()}, [store]);
    console.count('App')
    const element = useRoutes(getRoutes());
    return element;
});

function getRoutes(){
    let items: RouteObject[] = [
        {
            path: "/",
            element: (<Layout user={globalStore.app.user} loading={globalStore.app.isLoading} />),
            children: [
                {index: true, element: <Home/>},
                {path: "*", element: (<Navigate to="/" />)}
            ]
        }
    ];
    return items;
}