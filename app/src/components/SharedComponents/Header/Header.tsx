import React from 'react';
import { Option } from "@hqoss/monads";
import { User } from "../../../types/users/user";
import { Languages } from "../Languages/Languages";
import { getLangHref, NavItem } from "../NavItem/NavItem";
import { GuestLinks } from "../GuestLinks/GuestLinks";
import { UserLinks } from "../UserLinks/UserLinks";
import { Language } from '../../../services/localization/Language';
import { useLocalization } from '../../../services/localization/reactLocalization';

export function Header({
    user,
    currentLanguage,
    onChangeLanguage
}: {
    user: Option<User>;
    currentLanguage: Language;
    onChangeLanguage: (language: Language) => void;
}) {
    const {language, localization} = useLocalization();
    return (
        <nav className='navbar navbar-light'>
            <div className='container'>
                <a className='navbar-brand' href={getLangHref(language, '/')}>
                    {localization.header.logoTitle}
                </a>

                <ul className='nav navbar-nav pull-xs-left'>
                    <Languages currentLanguage={currentLanguage} onChangeLanguage={onChangeLanguage} />
                </ul>
                <ul className='nav navbar-nav pull-xs-right'>
                    <NavItem text={localization.header.homePage} href='/' />

                    {user.match({
                        none: () => <GuestLinks />,
                        some: (user) => <UserLinks user={user} />
                    })}
                </ul>
            </div>
        </nav>
    );
}

