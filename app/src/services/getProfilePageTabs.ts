import { globalStore } from "../store/globalStore";

export const favoritedArticlesTab = 'favoritedArticles';
export const myArticlesTab = 'myArticles';

export function getProfilePageTabs() {
    return new Map<string, string>([
        [favoritedArticlesTab, globalStore.localization.localization.profile.favoritedArticles],
        [myArticlesTab, globalStore.localization.localization.profile.myArticles]
    ]);
}
