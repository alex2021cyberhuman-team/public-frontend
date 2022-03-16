import { NavigateFunction } from "react-router-dom";
import { login } from "../../../../services/conduit";
import { loadUserIntoApp } from "../../../../types/users/loadUserIntoApp";
import { UserForLogin } from "../../../../types/users/userForLogin";
import LoginStore from "../store/loginStore";

export async function signIn(ev: React.FormEvent, navigate: NavigateFunction, store: LoginStore) {
    ev.preventDefault();

    if (store.loggingIn)
        return;
    store.startLoginIn();

    const user = store.user as UserForLogin;
    const result = await login(user);

    result.match({
        ok: (user) => {
            navigate('/');
            loadUserIntoApp(user);
        },
        err: (e) => {
            store.updateErrors(e);
        },
    });
}
