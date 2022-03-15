import { makeAutoObservable } from "mobx";
import { Article } from "../../types/articles/article";
import { None, Option } from "@hqoss/monads";
import { User } from "../../types/users/user";
import localizedStrings, { getOrReloadLanguage, Language } from "../../services/localization";

export default class AppStore {
    user: Option<User> = None;
    language: Language = '';
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    loadAsync = async () => {
        this.language = getOrReloadLanguage();
        await Promise.resolve();
        return this.isLoading = false;
    }
}

export const appStore = new AppStore();
