import {getOrReloadLanguage, languagesTranslates, setAndSaveLanguage} from "../../services/localization";
import React from "react";

export function Languages() {
    let items = [];
    const language = getOrReloadLanguage();
    console.log(languagesTranslates);
    for (const code of languagesTranslates.keys()) {
        console.log(code);
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
                (<li className='nav-item'>
                    <a
                        id={item.id}
                        href="#0"
                        className={item.className}
                        onClick={() => setAndSaveLanguage(item.code)}>{item.text}</a>
                </li>)))}
        </>
    )
}