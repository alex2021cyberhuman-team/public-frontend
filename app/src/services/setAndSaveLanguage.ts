import { runInAction } from 'mobx';
import { globalStore } from '../store/globalStore';
import { localizedStrings, LOCALSTORAGE_LANGUAGE } from './localization';


export function setAndSaveLanguage(newLanguage: string) {
    runInAction(() => {
        globalStore.app.language = newLanguage;
        localizedStrings.setLanguage(newLanguage);
        localStorage.setItem(LOCALSTORAGE_LANGUAGE, newLanguage);
    });
}
