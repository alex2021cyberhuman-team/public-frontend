import localizedStrings from "./localization";

const globalFeedTab = 'globalFeed'
const yourFeedTab = 'yourFeed'

const tabs = {
    globalFeedTab,
    yourFeedTab
}

export function getTabName(tab: string) {
    switch (tab) {
        case globalFeedTab: return localizedStrings.home.feed.globalFeed;
        case yourFeedTab: return localizedStrings.home.feed.yourFeed;
        default: return 'Not found'
    }
}

export default tabs;