import axios from 'axios';
import { globalStore } from '../../store/globalStore';
import { LOCALSTORAGE_TOKEN } from './user';


export function logout() {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    axios.defaults.headers.common.Authorization = '';
    globalStore.app.logout();
}
