import {User} from "../../../types/users/user";
import React, {Fragment} from "react";
import localizedStrings from "../../../services/localization";
import {NavItem} from "../NavItem/NavItem";

export function UserLinks({user: {username}}: { user: User }) {
    return (
        <Fragment>
            <NavItem text={localizedStrings.header.newArticle} href='/editor' icon='ion-compose'/>
            <NavItem text={localizedStrings.header.settings} href='/settings' icon='ion-gear-a'/>
            <NavItem text={`${username}`} href={`/profile/${username}`}/>
        </Fragment>
    );
}