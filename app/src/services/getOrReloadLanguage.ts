import { globalStore } from '../store/globalStore';
import { setAndSaveLanguage } from './setAndSaveLanguage';
import { LOCALSTORAGE_LANGUAGE, localizedStrings } from './localization';
import { Language } from "./Language";


export function getOrReloadStateLanguage() {
    console.count('getOrReloadLanguage');
    let language = globalStore.app.language as Language | null;
    const stateLanguageLoaded = !!language;
    language = language || localStorage.getItem(LOCALSTORAGE_LANGUAGE) as Language | null || localizedStrings.getLanguage();;
    if (!stateLanguageLoaded)
        setAndSaveLanguage(language);
    return language;
}
