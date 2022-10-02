import React from 'react';
import {useLocalization} from "../../../services/localization/reactLocalization";
import { assignLangHref, getLangHref } from '../NavItem/NavItem';

export function Footer() {
    const {language, localization} = useLocalization();
    return (
        <footer>
            <div className='container'>
                <a href={getLangHref(language, '')} className='logo-font'>
                    {localization.footer.logo}
                </a>
                <span className='attribution'>
                     {localization.formatString(localization.footer.attribution, (<a href='https://github.com/alex2021cyberhuman-team'>alex2021cyberhuman-team</a>))}
                </span>
            </div>
        </footer>
    );
}
