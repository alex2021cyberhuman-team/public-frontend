import axios from 'axios';
import { getAccessTokenExpire } from "./tokenData";
import { scheduleRefreshToken } from "../../services/conduitApi/scheduleRefreshToken";
import { globalStore } from '../../store/globalStore';
import { User, LOCALSTORAGE_TOKEN } from './user';


export function loadUserIntoApp(user: User) {
    localStorage.setItem(LOCALSTORAGE_TOKEN, user.token);
    axios.defaults.headers.common.Authorization = `Token ${user.token}`;
    user.accessTokenExpireTime = getAccessTokenExpire(user.token);
    if (user.accessTokenExpireTime) {
        scheduleRefreshToken(user);
    }
    globalStore.app.loadUser(user);
}