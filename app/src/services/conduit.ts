import {Err, Ok, Result} from '@hqoss/monads';
import axios from "axios";
import {scheduleJob} from "node-schedule";
import settings from "../config/settings";
import { getOrReloadStateLanguage } from "./getOrReloadLanguage";
import {User, userDecoder} from "../types/users/user";
import { loadUserIntoApp } from "../types/users/loadUserIntoApp";
import { logout } from "../types/users/logout";
import {ArticlesFilters} from "../types/articles/articlesFilters";
import {MultipleArticles, multipleArticlesDecoder} from "../types/articles/multipleArticles";
import {objectToQueryString} from "../types/infrastructure/object";
import {Tags, tagsDecoder} from "../types/tags/tag";
import {GenericErrors, genericErrorsDecoder} from "../types/errors/error";
import {UserSettings} from "../types/users/userSettings";
import {UserForRegistration} from "../types/users/userForRegistration";
import {Article, articleDecoder} from "../types/articles/article";
import {ArticleForEditor} from "../types/articles/articleForEditor";
import {Profile, profileDecoder} from "../types/users/profile";
import {FeedFilters} from "../types/articles/feedFilters";
import {Comment, commentDecoder, commentsDecoder} from "../types/comments/comment";
import {ResErr} from "@hqoss/monads/dist/lib/result/result";
import { UserForLogin } from '../types/users/userForLogin';

axios.defaults.baseURL = settings.baseApiUrl;
const VALIDATION_ERROR_STATUS = 422;
export const ARTICLES_DEFAULT_LIMIT = 10;

function catchUnprocessableEntity<T>(exception: any): ResErr<T, GenericErrors> {
    if (exception &&
        axios.isAxiosError(exception) &&
        exception.response &&
        exception.response?.status == VALIDATION_ERROR_STATUS) {
        const genericErrors = genericErrorsDecoder.verify(exception.response.data.errors);
        return Err(genericErrors);
    }
    throw exception;
}

axios.interceptors.request.use((request) => {
    const languageCode = getOrReloadStateLanguage();
    if (request && request.headers) {
        request.headers['Accept-Language'] = languageCode;
    }
    return request;
});

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
        limit: ARTICLES_DEFAULT_LIMIT,
        offset: 0,
        ...filters,
    };
    const response = await axios.get(`articles?${objectToQueryString(finalFilters)}`);
    const articles = multipleArticlesDecoder.verify(response.data);
    return articles;
}

export async function getTags(): Promise<Tags> {
    const response = await axios.get('tags');
    const tags = tagsDecoder.verify(response.data);
    return tags;
}

export async function login({email, password}: UserForLogin): Promise<Result<User, GenericErrors>> {
    try {
        const {data} = await axios.post('users/login', {user: {email, password}});
        const user = userDecoder.verify(data.user);
        return Ok(user);
    } catch (exception) {
        return catchUnprocessableEntity(exception);
    }
}

export async function getUser(): Promise<User> {
    const {data} = await axios.get('user');
    const user = userDecoder.verify(data.user);
    return user;
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
        const result = userDecoder.verify(data.user);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception)
    }
}

export async function signUp(user: UserForRegistration): Promise<Result<User, GenericErrors>> {
    try {
        const {data} = await axios.post('users', {user});
        const result = userDecoder.verify(data.user);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception)
    }
}

export async function createArticle(article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
    try {
        const {data} = await axios.post('articles', {article});
        const result = articleDecoder.verify(data.article);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception)
    }
}

export async function getArticle(slug: string): Promise<Article> {
    const {data} = await axios.get(`articles/${slug}`);
    const result = articleDecoder.verify(data.article);
    return result;
}

export async function updateArticle(slug: string, article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
    try {
        const {data} = await axios.put(`articles/${slug}`, {article});
        const result = articleDecoder.verify(data.article);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception)
    }
}

export async function getProfile(username: string): Promise<Profile> {
    const {data} = await axios.get(`profiles/${username}`);
    const result = profileDecoder.verify(data.profile);
    return result;
}

export async function followUser(username: string): Promise<Profile> {
    const {data} = await axios.post(`profiles/${username}/follow`);
    const result = profileDecoder.verify(data.profile);
    return result;
}

export async function unfollowUser(username: string): Promise<Profile> {
    const {data} = await axios.delete(`profiles/${username}/follow`);
    const result = profileDecoder.verify(data.profile);
    return result;
}

export async function getFeed(filters: FeedFilters = {}): Promise<MultipleArticles> {
    const finalFilters: ArticlesFilters = {
        limit: 10,
        offset: 0,
        ...filters,
    };
    const response = await axios.get(`articles/feed?${objectToQueryString(finalFilters)}`);
    const articles = multipleArticlesDecoder.verify(response.data);
    return articles;
}

export async function getArticleComments(slug: string): Promise<Comment[]> {
    const {data} = await axios.get(`articles/${slug}/comments`);
    const comments = commentsDecoder.verify(data.comments);
    return comments;
}

export async function deleteComment(slug: string, commentId: string): Promise<void> {
    await axios.delete(`articles/${slug}/comments/${commentId}`);
}

export async function createComment(slug: string, body: string): Promise<Comment> {
    const {data} = await axios.post(`articles/${slug}/comments`, {comment: {body}});
    const comment = commentDecoder.verify(data.comments);
    return comment;
}

export async function deleteArticle(slug: string): Promise<void> {
    await axios.delete(`articles/${slug}`);
}
