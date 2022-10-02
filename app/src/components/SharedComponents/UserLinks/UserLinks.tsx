import {User} from "../../../types/users/user";
import React, {Fragment} from "react";
import {NavItem} from "../NavItem/NavItem";
import { useLocalization } from "../../../services/localization/reactLocalization";

export function UserLinks({user: {username}}: { user: User }) {
    const {localization} = useLocalization();
    return (
        <Fragment>
            <NavItem text={localization.header.newArticle} href='/editor' icon='ion-compose'/>
            <NavItem text={localization.header.settings} href='/settings' icon='ion-gear-a'/>
            <NavItem text={`${username}`} href={`/profile/${username}`}/>
        </Fragment>
    );
}