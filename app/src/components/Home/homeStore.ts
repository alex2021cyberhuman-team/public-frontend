import { makeAutoObservable } from "mobx";
import { Article } from "../../types/articles/article";
import { None, Option } from "@hqoss/monads";
import { Tag } from "../../types/tags/tag";
import { globalFeedTab } from "./getHomePageTabs";

export default class HomeStore {
    articles: Option<Article[]> = None;
    articlesCount: number = 0;
    currentPage: number = 0;
    tabs: string[] = [globalFeedTab];
    selectedTab: string = globalFeedTab;
    tags: Option<Tag[]> = None;

    constructor() {
        makeAutoObservable(this)
    }

    onLoadArticlesAsync = () => Promise.resolve();
    onTabChange = (tab: string) => { };
    onTagChange = (selected: Tag) => { };
    onPageChange = (index: number) => { };
    onFavoriteToggledAsync = (model: Article) => Promise.resolve();
}

export const homeStore = new HomeStore();
