import localizedStrings from "./localization";

const globalFeedTab = 'globalFeed';
const yourFeedTab = 'yourFeed';
const favoritedArticlesTab = 'favoritedArticles';
const myArticlesTab = 'myArticles';

const tabs = {
    globalFeedTab,
    yourFeedTab,
    favoritedArticlesTab,
    myArticlesTab
}

export function getHomePageTabs() {
    return new Map<string, string>([
        [globalFeedTab, localizedStrings.home.feed.globalFeed],
        [yourFeedTab, localizedStrings.home.feed.yourFeed]
    ])
}

export function getProfilePageTabs() {
    return new Map<string, string>([
        [favoritedArticlesTab, localizedStrings.profile.favoritedArticles],
        [myArticlesTab, localizedStrings.profile.myArticles]
    ])
}

export default tabs;