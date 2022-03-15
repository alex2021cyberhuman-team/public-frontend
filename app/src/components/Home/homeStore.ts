import { makeAutoObservable, runInAction } from "mobx";
import { Article } from "../../types/articles/article";
import { None, Option, Some } from "@hqoss/monads";
import { Tag } from "../../types/tags/tag";
import { globalFeedTab, yourFeedTab } from "./getHomePageTabs";
import { globalStore } from "../../store/globalStore";
import { ARTICLES_DEFAULT_LIMIT, favoriteArticle, getArticles, getFeed, getTags, unfavoriteArticle } from "../../services/conduit";
import { MultipleArticles } from "../../types/articles/multipleArticles";

export default class HomeStore {
    articles: Option<Article[]> = None;
    articlesCount: number = 0;
    currentPage: number = 1;
    tabs: string[] = [globalFeedTab];
    selectedTab: string = globalFeedTab;
    tags: Option<Tag[]> = None;
    selectedTag: Option<Tag> = None;

    constructor() {
        makeAutoObservable(this);
    }

    get favoriteDisabled() {
        return globalStore.app.user.isNone()
    };

    async onLoadArticlesAsync() {
        console.log('start home');
        this.selectTab();
        await this.realoadArticles();
        console.log('end home');
    };

    onTabChange(tab: string) {
        this.selectTab(tab); 
        this.realoadArticles(); 
    };

    onTagChange(selected: Tag) { 
        this.selectedTag = Some(selected); 
        this.realoadArticles(); 
    }

    onPageChange(index: number) { 
        this.currentPage = index; 
        this.realoadArticles(); 
    }

    async onFavoriteToggledAsync(model: Article) {
        return model.favorited ? unfavoriteArticle(model.slug) : favoriteArticle(model.slug);
    }

    private async realoadArticles() {
        let tagsPromise = Promise.resolve();
        if (this.tags.isNone()) {
            tagsPromise = this.startLoadTags();
        }
        const articlesPromise = this.startLoadArticles();
        await Promise.all([tagsPromise, articlesPromise]);
    }

    private selectTab(tab?: string) {
        if (!tab) {
            this.initTab();
        } else {
            this.determineTab(tab);
        }

    }

    private determineTab(tab: string) {
        if (globalStore.app.user.isSome() && tab === yourFeedTab) {
            this.selectedTab = yourFeedTab;
        } else {
            this.selectedTab = globalFeedTab;
        }
    }

    private initTab() {
        if (globalStore.app.user.isSome()) {
            this.tabs.push(yourFeedTab);
            this.selectedTab = yourFeedTab;
        } else {
            this.tabs = [globalFeedTab];
            this.selectedTab = globalFeedTab;
        }
    }

    private startLoadArticles() {
        let getArticlesPromise: Promise<MultipleArticles>;
        const pageFilters = {
            offset: (this.currentPage - 1) * ARTICLES_DEFAULT_LIMIT
        };
        if (this.selectedTab = globalFeedTab) {
            getArticlesPromise = getArticles({
                ...pageFilters,
                tag: this.selectedTag.match({
                    none: () => undefined,
                    some: (tag) => tag
                })
            });
        } else {
            getArticlesPromise = getFeed(pageFilters);
        }
        const loadArticlesPromise = getArticlesPromise
            .then((multiple) => {
                runInAction(() => this.articles = Some(multiple.articles));
                runInAction(() => this.articlesCount = multiple.articlesCount);
            });
        return loadArticlesPromise;
    }

    private startLoadTags() {
        const getTagsPromise = getTags();
        const loadTagsPromise = getTagsPromise
            .then((t) => t.tags)
            .then((t) => { runInAction(() => this.tags = Some(t)); });
        return loadTagsPromise;
    }
}

export const homeStore = new HomeStore();
