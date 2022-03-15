import React, {Fragment, ReactElement} from "react";
import {Outlet, RouteObject, useRoutes} from "react-router-dom";
import {User} from "../../../types/users/user";
import {Header} from "../Header/Header";
import {Option} from "@hqoss/monads";
import {Footer} from "../Footer/Footer";
import localizedStrings from "../../../services/localization";
import { getOrReloadStateLanguage } from "../../../services/getOrReloadLanguage";
import { JsxElement } from "typescript";

export function Layout({user, loading}: { user: Option<User>; loading: boolean;}) {
    return (
        <Fragment>
            {!loading && (
                <Fragment>
                    <Header user={user}/>
                    <Outlet/>
                    <Footer/>
                </Fragment>
            ) || <p>{localizedStrings.viewer.loading}</p>}
        </Fragment>
    )
}
