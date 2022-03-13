import {Err, Ok, Result} from '@hqoss/monads';
import axios from 'axios';
import {array, Decoder, object, string} from 'decoders';
import settings from '../config/settings';
import {store} from '../state/store';
import {Article, articleDecoder, ArticleForEditor, ArticlesFilters, FeedFilters, MultipleArticles, multipleArticlesDecoder,} from '../types/article';
import {scheduleJob} from 'node-schedule';
import {Comment, commentDecoder} from '../types/comment';
import {GenericErrors, genericErrorsDecoder} from '../types/error';
import {objectToQueryString} from '../types/object';
import {Profile, profileDecoder} from '../types/profile';
import {loadUserIntoApp, User, userDecoder, UserForRegistration, UserSettings} from '../types/user';
import {logout} from "../components/App/App.slice";

axios.defaults.baseURL = settings.baseApiUrl;

axios.interceptors.request.use((request) => {
    const state = store.getState();
    const languageCode = state.app.language;
    if (!!request && !!languageCode) {
        // @ts-ignore
        request.headers['Accept-Language'] = languageCode;
    }
    return request;
})

export function guard<T>(decoder: Decoder<T>){
    return (value: T) => decoder.verify(value);
}

export function scheduleRefreshToken(user: User) {
    const now = new Date();
    if (user.accessTokenExpireTime && user.accessTokenExpireTime >= now) {
        const refreshTime = new Date(+user.accessTokenExpireTime - 10 * 1000);
        scheduleJob(refreshTime, refreshToken);
    }
}

export function refreshToken() {
    getUser()
        .then((user) => loadUserIntoApp(user))
        .catch(() => logout());
}

export async function getArticles(filters: ArticlesFilters = {}): Promise<MultipleArticles> {
    const finalFilters: ArticlesFilters = {
        limit: 10,
        offset: 0,
        ...filters,
    };
    return guard(multipleArticlesDecoder)((await axios.get(`articles?${objectToQueryString(finalFilters)}`)).data);
}

export async function getTags(): Promise<{ tags: string[] }> {
    return guard(object({tags: array(string)}))((await axios.get('tags')).data);
}

export async function login(email: string, password: string): Promise<Result<User, GenericErrors>> {
    try {
        const {data} = await axios.post('users/login', {user: {email, password}});

        return Ok(guard(object({user: userDecoder}))(data).user);
    } catch ({response: {data}}) {
        return Err(guard(object({errors: genericErrorsDecoder}))(data as {errors: GenericErrors}).errors);
    }
}

export async function getUser(): Promise<User> {
    const {data} = await axios.get('user');
    return guard(object({user: userDecoder}))(data).user;
}

export async function favoriteArticle(slug: string): Promise<void> {
    await axios.post(`articles/${slug}/favorite`);
}

export async function unfavoriteArticle(slug: string): Promise<void> {
    await axios.delete(`articles/${slug}/favorite`);
}

export async function updateSettings(user: UserSettings): Promise<Result<User, GenericErrors>> {
    try {
        const {data} = await axios.put('user', {user});

        return Ok(guard(object({user: userDecoder}))(data).user);
    } catch ({data}) {
        return Err(guard(object({errors: genericErrorsDecoder}))(data as {errors: GenericErrors}).errors);
    }
}

export async function signUp(user: UserForRegistration): Promise<Result<User, GenericErrors>> {
    try {
        const data = (await axios.post('users', {user})).data;
        return Ok(guard(object({user: userDecoder}))(data).user);
    } catch ({response: {data}}) {
        return Err(guard(object({errors: genericErrorsDecoder}))(data as {errors: GenericErrors}).errors);
    }
}

export async function createArticle(article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
    try {
        const {data} = await axios.post('articles', {article});

        return Ok(guard(object({article: articleDecoder}))(data).article);
    } catch ({response: {data}}) {
        return Err(guard(object({errors: genericErrorsDecoder}))(data as {errors: GenericErrors}).errors);
    }
}

export async function getArticle(slug: string): Promise<Article> {
    const {data} = await axios.get(`articles/${slug}`);
    return guard(object({article: articleDecoder}))(data).article;
}

export async function updateArticle(slug: string, article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
    try {
        const {data} = await axios.put(`articles/${slug}`, {article});

        return Ok(guard(object({article: articleDecoder}))(data).article);
    } catch ({response: {data}}) {
        return Err(guard(object({errors: genericErrorsDecoder}))(data as {errors: GenericErrors}).errors);
    }
}

export async function getProfile(username: string): Promise<Profile> {
    const {data} = await axios.get(`profiles/${username}`);
    return guard(object({profile: profileDecoder}))(data).profile;
}

export async function followUser(username: string): Promise<Profile> {
    const {data} = await axios.post(`profiles/${username}/follow`);
    return guard(object({profile: profileDecoder}))(data).profile;
}

export async function unfollowUser(username: string): Promise<Profile> {
    const {data} = await axios.delete(`profiles/${username}/follow`);
    return guard(object({profile: profileDecoder}))(data).profile;
}

export async function getFeed(filters: FeedFilters = {}): Promise<MultipleArticles> {
    const finalFilters: ArticlesFilters = {
        limit: 10,
        offset: 0,
        ...filters,
    };
    return guard(multipleArticlesDecoder)((await axios.get(`articles/feed?${objectToQueryString(finalFilters)}`)).data);
}

export async function getArticleComments(slug: string): Promise<Comment[]> {
    const {data} = await axios.get(`articles/${slug}/comments`);
    return guard(object({comments: array(commentDecoder)}))(data).comments;
}

export async function deleteComment(slug: string, commentId: string): Promise<void> {
    await axios.delete(`articles/${slug}/comments/${commentId}`);
}

export async function createComment(slug: string, body: string): Promise<Comment> {
    const {data} = await axios.post(`articles/${slug}/comments`, {comment: {body}});
    return guard(object({comment: commentDecoder}))(data).comment;
}

export async function deleteArticle(slug: string): Promise<void> {
    await axios.delete(`articles/${slug}`);
}
