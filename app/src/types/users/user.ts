import axios from 'axios';
import {date, Decoder, nullable, object, optional, string} from 'decoders';
import {PublicUser} from "./publicUser";
import {getAccessTokenExpire} from "./tokenData";
import {scheduleRefreshToken} from "../../services/conduit";

export const LOCALSTORAGE_TOKEN = 'token';

export interface User extends PublicUser {
    email: string;
    token: string;
    accessTokenExpireTime?: Date | undefined;
}

export const userDecoder: Decoder<User> = object({
    email: string,
    token: string,
    username: string,
    accessTokenExpireTime: optional(date),
    bio: nullable(string),
    image: nullable(string),
});

export function loadUserIntoApp(user: User) {
    localStorage.setItem(LOCALSTORAGE_TOKEN, user.token);
    axios.defaults.headers.common.Authorization = `Token ${user.token}`;
    user.accessTokenExpireTime = getAccessTokenExpire(user.token);
    if (user.accessTokenExpireTime) {
        scheduleRefreshToken(user);
    }
    // TODO: MOBX store.dispatch(loadUser(user));
}

export function logout() {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    axios.defaults.headers.common.Authorization = '';
    // TODO: MOBX store.dispatch(logout(user));
}


