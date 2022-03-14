import jwtDecode from "jwt-decode";
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

async function checkTokenOrEndLoading() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
    const now = new Date();
    const expire = getAccessTokenExpire(token);
    // TODO: MOBX
    // if (!store.getState().app.loading || !token || !expire || expire < now) {
    //     store.dispatch(endLoad());
    //     return;
    // } else {
    //     axios.defaults.headers.common.Authorization = `Token ${token}`;
    //     store.dispatch(loadUser(await getUser()));
    // }
}