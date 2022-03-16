import { makeAutoObservable, runInAction } from "mobx";
import { Article } from "../../../../types/articles/article";
import { None, Option, Some } from "@hqoss/monads";
import { Tag } from "../../../../types/tags/tag";
import { globalFeedTab, yourFeedTab } from "../services/getHomePageTabs";
import GlobalStore from "../../../../store/globalStore";
import { ARTICLES_DEFAULT_LIMIT } from "../../../../services/conduitApi/axiosSettings";
import { getFeed } from "../../../../services/conduitApi/getFeed";
import { unfavoriteArticle } from "../../../../services/conduitApi/unfavoriteArticle";
import { favoriteArticle } from "../../../../services/conduitApi/favoriteArticle";
import { getTags } from "../../../../services/conduitApi/getTags";
import { getArticles } from "../../../../services/conduitApi/getArticles";
import { MultipleArticles } from "../../../../types/articles/multipleArticles";
import { optional } from "decoders";
import { ArticleViewModel } from "../../../SharedComponents/ArticleList/ArticleList";

export default class HomeStore {
    articles: Option<ArticleViewModel[]> = None;
    articlesCount: number = 0;
    currentPage: number = 1;
    tabs: string[] = [globalFeedTab];
    selectedTab: string = globalFeedTab;
    tags: Option<Tag[]> = None;
    selectedTag: Option<Tag> = None;
    global: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.global = globalStore;
        makeAutoObservable(this, { global: false });
    }

    get favoriteDisabled() {
        return this.global.app.user.isNone()
    };

    checkParams(tagParam: string | undefined, tabParam: string | undefined) {        
        this.selectedTag = tagParam ? Some(tagParam) : None;
        this.selectTab(tabParam);
        tagParam = tagParam || '';
        tabParam = tabParam || globalFeedTab;
        return tabParam === this.selectedTab && tagParam === this.selectedTag.unwrapOr('');
    }

    async onLoadArticlesAsync() {
        await this.realoadArticles();
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

    async onFavoriteToggledAsync(index: number, model: ArticleViewModel) {
        if (this.articles.isNone()) {
            throw new Error('onFavoriteToggledAsync call when articles is None');
        }
        const favorited = model.article.favorited;
        const favoritesCount = model.article.favoritesCount;
        this.articles = this.articles.map((articles) => articles
            .map((m, i) => i === index ? {
                ...model,
                isSubmitting: false,
                article: {
                    ...model.article,
                    favoritesCount: favoritesCount + (favorited ? -1 : 1),
                    favorited: !favorited
                }
            } : m));
        const promise = model.article.favorited ? unfavoriteArticle(model.article.slug) : favoriteArticle(model.article.slug);
        promise
            .then(() => runInAction(() => this.articles = this.articles.map((articles) => articles
                .map((m, i) => i === index ? {
                    ...model,
                    isSubmitting: false,
                } : m))));
        await promise;
    }

    async realoadArticles() {
        let tagsPromise = Promise.resolve();
        if (this.tags.isNone()) {
            tagsPromise = this.startLoadTags();
        }
        const articlesPromise = this.startLoadArticles();
        await Promise.all([tagsPromise, articlesPromise]);
    }

    selectTab(tab?: string | undefined | null) {
        if (tab && this.selectedTag.isSome()) {
            this.selectedTag = None;
        }
        if (!tab) {
            this.initTab();
        } else {
            this.determineTab(tab);
        }
        return this.selectedTab;
    }

    determineTab(tab: string) {
        if (this.global.app.user.isSome() && tab === yourFeedTab) {
            this.selectedTab = yourFeedTab;
        } else {
            this.selectedTab = globalFeedTab;
        }
    }

    initTab() {
        if (this.global.app.user.isSome() && this.tabs.indexOf(yourFeedTab) === -1) {
            this.tabs.push(yourFeedTab);
            this.selectedTab = yourFeedTab;
        } else if (this.tabs.indexOf(globalFeedTab) === -1) {
            this.tabs = [globalFeedTab];
            this.selectedTab = globalFeedTab;
        }
    }

    startLoadArticles() {
        let getArticlesPromise: Promise<MultipleArticles>;
        const pageFilters = {
            offset: (this.currentPage - 1) * ARTICLES_DEFAULT_LIMIT
        };
        if (this.selectedTab === globalFeedTab) {
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
                runInAction(() => {
                    this.articles = Some(multiple.articles.map(article => ({ article, isSubmitting: false })));
                    this.articlesCount = multiple.articlesCount;
                });
            });
        return loadArticlesPromise;
    }

    startLoadTags() {
        const getTagsPromise = getTags();
        const loadTagsPromise = getTagsPromise
            .then((t) => t.tags)
            .then((t) => { runInAction(() => this.tags = Some(t)); });
        return loadTagsPromise;
    }
}
