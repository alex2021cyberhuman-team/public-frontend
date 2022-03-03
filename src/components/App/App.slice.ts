import {None, Option, Some} from '@hqoss/monads';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user';
import localizedStrings from "../../services/localization";

export interface AppState {
    user: Option<User>;
    loading: boolean;
    language: string;
}

const initialState: AppState = {
    user: None,
    loading: true,
    language:  localStorage.getItem('languageCode') || localizedStrings.getLanguage()
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initializeApp: () => initialState,
        loadUser: (state, {payload: user}: PayloadAction<User>) => {
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
        endLoad: (state) => {
            state.loading = false;
        },
    },
});

export const {loadUser, logout, endLoad, initializeApp, changeLanguage} = slice.actions;

export default slice.reducer;
