import localizedStrings from "./localization";


export const favoritedArticlesTab = 'favoritedArticles';
export const myArticlesTab = 'myArticles';


export function getProfilePageTabs() {
    return new Map<string, string>([
        [favoritedArticlesTab, localizedStrings.profile.favoritedArticles],
        [myArticlesTab, localizedStrings.profile.myArticles]
    ]);
}
