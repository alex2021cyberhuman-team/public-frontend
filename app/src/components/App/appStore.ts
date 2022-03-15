import { makeAutoObservable } from "mobx";
import { None, Option } from "@hqoss/monads";
import { User } from "../../types/users/user";
import { Language } from "../../services/Language";

export default class AppStore {
    user: Option<User> = None;
    language: Language = '';
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    loadAsync() {
        this.endLoad();
        return Promise.resolve();
    }

    endLoad() {
        this.isLoading = false;
    }
}

export const appStore = new AppStore();
