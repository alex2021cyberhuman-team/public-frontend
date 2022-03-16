import { globalStore } from "../../../../store/globalStore";
export const globalFeedTab = 'globalFeed';
export const yourFeedTab = 'yourFeed';

export function getHomePageTabs() {
    return new Map<string, string>([
        [globalFeedTab, globalStore.localization.localization.home.feed.globalFeed],
        [yourFeedTab, globalStore.localization.localization.home.feed.yourFeed]
    ]);
}
