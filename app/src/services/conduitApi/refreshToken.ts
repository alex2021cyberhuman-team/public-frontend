import { loadUserIntoApp } from "../../types/users/loadUserIntoApp";
import { logout } from "../../types/users/logout";
import { getUser } from "./getUser";


export function refreshToken() {
    getUser()
        .then((user) => loadUserIntoApp(user))
        .catch(() => logout());
}
