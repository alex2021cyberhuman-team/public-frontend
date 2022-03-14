import React, {Fragment} from "react";
import {RouteObject, useRoutes} from "react-router-dom";
import {User} from "../../types/users/user";
import {Header} from "../Header/Header";
import {Option} from "@hqoss/monads";
import {Footer} from "../Footer/Footer";

export function Layout({routes, user, loading}: { routes: RouteObject[], user: Option<User>, loading: boolean }) {
    const element = useRoutes(routes);
    return (
        <Fragment>
            {!loading && (
                <Fragment>
                    <Header user={user}/>
                    {element}
                    <Footer/>
                </Fragment>
            )}
        </Fragment>
    )
}
