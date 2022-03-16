import { makeAutoObservable } from "mobx";
import { GenericErrors } from "../../../../types/errors/error";

export default class LoginStore {
    user: Record<string, any> = {
        email: "",
        password: ""
    };
    errors: GenericErrors = new Map<string, string[]>();
    loggingIn: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    updateField(name: string, value: string){
        this.user[name] = value;
    }

    updateErrors(e: GenericErrors) {
       this.errors = e;
       this.loggingIn = false;
    }

    startLoginIn() {
        this.loggingIn = true;
    }
}

export const loginStore = new LoginStore();