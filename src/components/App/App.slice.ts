import {None, Option, Some} from '@hqoss/monads';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user';
import localizedStrings from "../../services/localization";
import {scheduleRefreshToken} from "../../services/conduit";
import {evolve, F} from "ramda";

export interface AppState {
    user: Option<User>;
    loading: boolean;
    language: string;
}

const initialState: AppState = {
    user: None,
    loading: true,
    language: localizedStrings.getLanguage()
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initializeApp: (state) => {
            console.log(`set language ${localStorage.getItem('languageCode')} (${localizedStrings.getLanguage()})`)
            state.language = localStorage.getItem('languageCode') || state.language
            console.log(`end set language ${state.language}`)
        },
        loadUser: (state, {payload: user}: PayloadAction<User>) => {
            scheduleRefreshToken(user);
            state.user = Some(user);
            state.loading = false;
        },
        changeLanguage: (state, {payload: languageCode}: PayloadAction<string>) => {
            localizedStrings.setLanguage(languageCode);
            localStorage.setItem('languageCode', languageCode);
            state.language = languageCode;
        },
        logout: (state) => {
            state.user = None;
        },
        endLoad: (state) => evolve({loading: F})(state)
    },
});

export const {loadUser, logout, endLoad, initializeApp, changeLanguage} = slice.actions;

export default slice.reducer;
