import localizedStrings from "../../services/localization";
export const globalFeedTab = 'globalFeed';
export const yourFeedTab = 'yourFeed';

export function getHomePageTabs() {
    return new Map<string, string>([
        [globalFeedTab, localizedStrings.home.feed.globalFeed],
        [yourFeedTab, localizedStrings.home.feed.yourFeed]
    ]);
}
