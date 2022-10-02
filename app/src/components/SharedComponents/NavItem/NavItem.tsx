import {NavLink} from "react-router-dom";
import React from "react";
import { useLocalization } from "../../../services/localization/reactLocalization";

export function NavItem({text, href, icon, setLanguage, language}: { text: string; href: string; icon?: string; setLanguage?: boolean | undefined; language?: string | undefined}) {
    let to = href;
    const { language: hoockLanguage } = useLocalization();
    language = language || hoockLanguage;
    to = assignLangHref(language, setLanguage, href);
    return (
        <li className='nav-item'>
            <NavLink to={to} className={({isActive}) =>
                isActive ? 'active nav-link' : 'nav-link'
            }>
                {icon && <i className={icon}></i>}&nbsp;{text}
            </NavLink>
        </li>
    );
}


export function assignLangHref(language: string | undefined, setLanguage: boolean | undefined, href: string) {
    setLanguage = (setLanguage === undefined) ? true : setLanguage;
    let to = href;
    if (setLanguage) {
        to = `/${language}${to}`;
    }
    return to;
}

export function getLangHref(language: string | undefined, href: string) {
    let to = href;
    to = `/${language}${to}`;
    return to;
}