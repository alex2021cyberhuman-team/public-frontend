import React, {Fragment} from 'react';
import {HashRouter, NavLink} from 'react-router-dom';
import {useStore} from '../../state/storeHooks';
import {User} from '../../types/user';
import localizedStrings, {languagesTranslates} from "../../services/localization";
import {store} from "../../state/store";
import {changeLanguage} from "../App/App.slice";

export function Header() {
    const {user} = useStore(({app}) => app);

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
                    <HashRouter>
                        <NavItem text={localizedStrings.header.homePage} href='/'/>

                        {user.match({
                            none: () => <GuestLinks/>,
                            some: (user) => <UserLinks user={user}/>
                        })}
                    </HashRouter>
                </ul>
            </div>
        </nav>
    );
}

function NavItem({text, href, icon}: { text: string; href: string; icon?: string }) {
    return (
        <li className='nav-item'>
            <NavLink exact to={href} activeClassName='active' className='nav-link'>
                {icon && <i className={icon}></i>}&nbsp;{text}
            </NavLink>
        </li>
    );
}

function GuestLinks() {
    return (
        <Fragment>
            <NavItem text={localizedStrings.header.login} href='/login'/>
            <NavItem text={localizedStrings.header.register} href='/register'/>
        </Fragment>
    );
}

function UserLinks({user: {username}}: { user: User }) {
    return (
        <Fragment>
            <NavItem text={localizedStrings.header.newArticle} href='/editor' icon='ion-compose'/>
            <NavItem text={localizedStrings.header.settings} href='/settings' icon='ion-gear-a'/>
            <NavItem text={`${username}`} href={`/profile/${username}`}/>
        </Fragment>
    );
}

function Languages() {
    function setLanguage(code: string) {
        const language = store.getState().app.language;
        if (code !== language) {
            store.dispatch(changeLanguage(code));
            localizedStrings.setLanguage(code);
        }
    }

    function onSetLanguageClick(code: string) {
        setLanguage(code);
    }

    const currentLanguageCode = localizedStrings.getLanguage();
    const languages = localizedStrings.getAvailableLanguages();
    return (
        <>
            {
                languages.map(code => {
                    const className = 'nav-link' + (currentLanguageCode === code
                        ? ' active'
                        : '');
                    return (
                        <li className='nav-item' key={`language-li-${code}`}>
                            <a
                                id={`set-language-${code}`}
                                href='#'
                                className={className}
                                onClick={() => onSetLanguageClick(code)}>{languagesTranslates.get(code)}</a>
                        </li>
                    )
                })
            }
        </>
    )
}