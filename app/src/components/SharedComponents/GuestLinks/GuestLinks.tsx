import React, {Fragment} from "react";
import {useLocalization} from "../../../services/localization/reactLocalization";
import {NavItem} from "../NavItem/NavItem";

export function GuestLinks() {    
    const {localization} = useLocalization();
    return (
        <Fragment>
            <NavItem text={localization.header.login} href='/login'/>
            <NavItem text={localization.header.register} href='/register'/>
        </Fragment>
    );
}