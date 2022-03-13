import React from 'react';
import { render } from 'react-dom';
import localizedStrings from "../../services/localization";

export function Footer() {
    return (
        <footer>
            <div className='container'>
                <a href='/#/' className='logo-font'>
                    {localizedStrings.footer.logo}
                </a>
                <span className='attribution'>
                     {localizedStrings.formatString(localizedStrings.footer.attribution,(<a href='https://github.com/alex2021cyberhuman-team'>alex2021cyberhuman-team</a>))}
                </span>
            </div>
        </footer>
    );
}
