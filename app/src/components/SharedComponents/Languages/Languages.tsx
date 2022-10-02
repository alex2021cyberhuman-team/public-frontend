import { Fragment } from "react";
import { classObjectToClassName } from "../../../types/infrastructure/style";
import { Language } from "../../../services/localization/Language";
import { languagesTranslates, useLocalization } from "../../../services/localization/reactLocalization";
import { Navigate, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { assignLangHref, NavItem } from "../NavItem/NavItem";

export const LOCALSTORAGE_LANGUAGE_REDIRECT = 'languageRedirect';

export function LanguageNavigate({ to: href }: { to: string }) {
    const { language } = useLocalization();
    const to = assignLangHref(language, true, href);
    return (
        <Navigate to={to} />
    )
}

export function Languages({
    currentLanguage
}: {
    currentLanguage: Language;
    onChangeLanguage: (language: Language) => void
}) {
    const items = [...languagesTranslates];
    const localiton = useLocation();
    function getTargetPathForCode(code: string) {
        let path = localiton.pathname;
        path = path.replace(`/${currentLanguage}` as string, `/${code}` as string);
        return path;
    }

    return (
        <Fragment>
            {items.map(([code, text]) =>
                <NavItem
                    key={code}
                    text={text}
                    href={getTargetPathForCode(code)}
                    setLanguage={false}
                />)}
        </Fragment>
    )
};

function getLanguageButtonClass(language: string, code: string): string | undefined {
    return classObjectToClassName({ active: language === code, 'nav-link': true /*, 'btn-link': true */ });
}
