import {NavLink} from "react-router-dom";
import React from "react";

export function NavItem({text, href, icon}: { text: string; href: string; icon?: string }) {
    return (
        <li className='nav-item'>
            <NavLink to={href} className={({isActive}) =>
                isActive ? 'active nav-link' : 'nav-link'
            }>
                {icon && <i className={icon}></i>}&nbsp;{text}
            </NavLink>
        </li>
    );
}