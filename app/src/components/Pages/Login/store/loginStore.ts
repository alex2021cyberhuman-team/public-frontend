import { makeAutoObservable } from "mobx";
import GlobalStore from "../../../../store/globalStore";
import { GenericErrors } from "../../../../types/errors/error";

export default class LoginStore {
    user = ({
        email: "",
        password: ""
    });
    errors: GenericErrors = new Map<string, string[]>();
    loggingIn: boolean = false;
    global: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.global = globalStore;
        makeAutoObservable(this, { global: false });
    }

    updateField(name: string, value: string) {
        this.user = { ...this.user, [name]: value };
    }

    updateErrors(e: GenericErrors) {
        this.errors = e;
        this.loggingIn = false;
    }

    startLoginIn() {
        this.loggingIn = true;
    }
}
