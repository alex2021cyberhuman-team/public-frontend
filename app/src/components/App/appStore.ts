import { makeAutoObservable } from "mobx";
import { None, Option, Some } from "@hqoss/monads";
import { User } from "../../types/users/user";
import { tryReloadUserAsync } from "../../types/users/tokenData";
import GlobalStore from "../../store/globalStore";

export default class AppStore {
    user: Option<User> = None;
    isLoading = true;
    global: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.global = globalStore;
        makeAutoObservable(this, { global: false });
    }

    async loadAsync() {
        this.endLoad();
        await tryReloadUserAsync();
    }

    endLoad() {
        this.isLoading = false;
    }

    logout() {
        this.user = None;
    }

    loadUser(user: User) {
        this.user = Some(user);
    }
}
