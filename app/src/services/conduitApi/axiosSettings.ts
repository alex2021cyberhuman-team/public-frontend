import axios from "axios";
import settings from "../../config/settings";
import { globalStore } from "../../store/globalStore";

export const VALIDATION_ERROR_STATUS = 422;
export const ARTICLES_DEFAULT_LIMIT = 10;

export default function axiosSettings() {
    axios.defaults.baseURL = settings.baseApiUrl;
    axios.interceptors.request.use((request) => {
        const languageCode = globalStore.localization.language;
        if (request && request.headers) {
            request.headers['Accept-Language'] = languageCode;
        }
        return request;
    });
}

