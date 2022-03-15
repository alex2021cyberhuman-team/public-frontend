import {languagesTranslates} from "../../../services/localization";
import { getOrReloadStateLanguage } from "../../../services/getOrReloadLanguage";
import { setAndSaveLanguage } from "../../../services/setAndSaveLanguage";
import React from "react";

export function Languages() {
    let items = [];
    const language = getOrReloadStateLanguage();
    for (const code of languagesTranslates.keys()) {
        const className = 'nav-link' + (language === code
            ? ' active'
            : '');
        const itemCode = code;
        items.push(
            {
                key: `language-${itemCode}`,
                id: `set-language-${itemCode}`,
                className: className,
                text: languagesTranslates.get(itemCode),
                code: itemCode
            })
    }

    return (
        <>
            {items.map(item => (
                (<li className='nav-item' key={item.key}>
                    <a
                        id={item.id}
                        href="#0"
                        className={item.className}
                        onClick={() => setAndSaveLanguage(item.code)}>{item.text}</a>
                </li>)))}
        </>
    )
}