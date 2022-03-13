import {useStoreWithInitializer} from "../../state/storeHooks";
import {RouteObject, useRoutes} from "react-router-dom";
import {Home} from "../Pages/Home/Home";
import {ProfilePage} from "../Pages/ProfilePage/ProfilePage";
import {ArticlePage} from "../Pages/ArticlePage/ArticlePage";
import {Settings} from "../Pages/Settings/Settings";
import {NewArticle} from "../Pages/NewArticle/NewArticle";
import {EditArticle} from "../Pages/EditArticle/EditArticle";
import {Login} from "../Pages/Login/Login";
import {Register} from "../Pages/Register/Register";
import {Redirect} from "../Redirect/Redirect";
import React, {Fragment} from "react";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {getAccessTokenExpire} from "../../types/user";
import {store} from "../../state/store";
import {endLoad, loadUser} from "../App/App.slice";
import axios from "axios";
import {getUser} from "../../services/conduit";

export function Layout() {
    const {loading, user} = useStoreWithInitializer(({app}) => app, load);

    let routes: RouteObject[] = [
        {index: true, element: <Home/>},
        {
            path: '/profile/:username',
            element: <ProfilePage/>
        },
        {
            path: '/article/:slug',
            element: <ArticlePage/>
        }
    ];
    const userIsLogged = user.isSome();
    if (userIsLogged) {
        routes.push(
            {
                path: '/settings',
                element: <Settings/>
            });
        routes.push(
            {
                index: true,
                path: '/editor',
                element: <NewArticle/>
            });
        routes.push(
            {
                path: '/editor/:slug',
                element: <EditArticle/>
            });
    } else {
        routes.push(
            {
                path: '/login',
                element: <Login/>
            });
        routes.push(
            {
                path: '/register',
                element: <Register/>
            });
    }
    routes.push({path: "*", element: <Redirect to='/'/>});
    let element = useRoutes(routes);
    return (
        <Fragment>
            {!loading && (
                <Fragment>
                    <Header/>
                    {element}
                    <Footer/>
                </Fragment>
            )}
        </Fragment>
    )
}

async function load() {
    const token = localStorage.getItem('token');
    const now = new Date();
    const expire = getAccessTokenExpire(token);
    if (!store.getState().app.loading || !token || !expire || expire < now) {
        store.dispatch(endLoad());       
        return;
    } else {
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        store.dispatch(loadUser(await getUser()));
    }
}