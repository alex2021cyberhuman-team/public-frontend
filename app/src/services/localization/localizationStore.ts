import { makeAutoObservable, runInAction } from "mobx";
import GlobalStore from "../../store/globalStore";
import { LOCALSTORAGE_LANGUAGE } from "./conf";
import { Language } from "./Language";
import localizedStrings from "./localizedStringsInstance";

class LocalizationStore {
    localization: typeof localizedStrings;
    language: Language;
    global: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.global = globalStore;
        this.language = localStorage.getItem(LOCALSTORAGE_LANGUAGE) || 'ru';
        this.localization = localizedStrings;
        this.localization.setLanguage(this.language);
        makeAutoObservable(this, { global: false });
    }

    setLanguage(newLanguage: string) {
        runInAction(() => {
            this.localization.setLanguage(newLanguage);
            localStorage.setItem(LOCALSTORAGE_LANGUAGE, newLanguage);
            this.language = newLanguage;
        })
    }

    onChangeLanguage(newLanguage: Language) {
        this.setLanguage(newLanguage);
    }
}

export default LocalizationStore;