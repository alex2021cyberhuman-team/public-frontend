import React from 'react';
import localizedStrings from '../../../services/localization';
import {Option} from "@hqoss/monads";
import {User} from "../../../types/users/user";
import {Languages} from "../Languages/Languages";
import {NavItem} from "../NavItem/NavItem";
import {GuestLinks} from "../GuestLinks/GuestLinks";
import {UserLinks} from "../UserLinks/UserLinks";

export function Header({user}: { user: Option<User> }) {
    return (
        <nav className='navbar navbar-light'>
            <div className='container'>
                <a className='navbar-brand' href='/#/'>
                    {localizedStrings.header.logoTitle}
                </a>

                <ul className='nav navbar-nav pull-xs-left'>
                    <Languages/>
                </ul>
                <ul className='nav navbar-nav pull-xs-right'>
                    <NavItem text={localizedStrings.header.homePage} href='/'/>

                    {user.match({
                        none: () => <GuestLinks/>,
                        some: (user) => <UserLinks user={user}/>
                    })}
                </ul>
            </div>
        </nav>
    );
}

