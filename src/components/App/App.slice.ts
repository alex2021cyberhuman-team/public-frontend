import { None, Option, Some } from '@hqoss/monads';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { scheduleRefreshToken } from '../../services/webapi/conduit';
import { always, apply, compose, defaultTo, evolve, F, ifElse } from 'ramda';
import { enStrings, Localization } from '../../services/localizations/enStrings';
import { languagesDictionaries } from '../../services/localizations/localization';

export interface AppState {
  user: Option<User>;
  loading: boolean;
  language: string;
  localization: Localization;
}

const initialState: AppState = {
  user: None,
  loading: true,
  language: 'en',
  localization: enStrings,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadLanguage: (state) => {
      let language = localStorage.getItem('languageCode') || state.language;
      const isLanguageDefined = languagesDictionaries.has(language);
      if (isLanguageDefined) {
        state.language = language;
        state.localization = languagesDictionaries.get(language)!;
        localStorage.setItem('languageCode', language);
      }
    },
    loadUser: (state, { payload: user }: PayloadAction<User>) => {
      scheduleRefreshToken(user);
      state.user = Some(user);
      state.loading = false;
    },
    changeLanguage: (state, { payload: languageCode }: PayloadAction<string>) => {
      const isLanguageDefined = languagesDictionaries.has(languageCode);
      if (!isLanguageDefined) {
        throw new Error(`${languageCode} is invalid language code`);
      }
      localStorage.setItem('languageCode', languageCode);
      state.language = languageCode;
      state.localization = languagesDictionaries.get(languageCode)!;
    },
    logout: (state) => {
      state.user = None;
      localStorage.removeItem('token');
    },
    endLoad: (state) => evolve({ loading: F })(state),
  },
});

export const { loadUser, logout, endLoad, loadLanguage, changeLanguage } = slice.actions;

export default slice.reducer;
