import React, {Fragment} from "react";
import localizedStrings from "../../../services/localization";
import {NavItem} from "../NavItem/NavItem";

export function GuestLinks() {
    return (
        <Fragment>
            <NavItem text={localizedStrings.header.login} href='/login'/>
            <NavItem text={localizedStrings.header.register} href='/register'/>
        </Fragment>
    );
}