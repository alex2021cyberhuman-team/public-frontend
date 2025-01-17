import jwtDecode from "jwt-decode";
import { getUser } from "../../services/conduitApi/getUser";
import {globalStore} from "../../store/globalStore";
import { loadUserIntoApp } from "./loadUserIntoApp";
import {LOCALSTORAGE_TOKEN} from "./user";

export interface TokenData {
    iat: number,
    jti: string,
    sub: string,
    exp: number
}

export function getAccessTokenExpire(token?: string | undefined | null) {
    if (!token) {
        return undefined;
    }

    try {
        const decodedTokenData = jwtDecode<TokenData>(token);
        const expireAtSeconds = decodedTokenData.exp;
        return new Date(expireAtSeconds * 1000);
    } catch (e) {
        return undefined;
    }
}

export async function tryReloadUserAsync() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
    const now = new Date();
    const expire = getAccessTokenExpire(token);
    if (!globalStore.app.isLoading || !token || !expire || expire < now) {
        globalStore.app.endLoad();
        return false;
    } else {
        const user = await getUser();
        loadUserIntoApp(user);
        return true;
    }
}