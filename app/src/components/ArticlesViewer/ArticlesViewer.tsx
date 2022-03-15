import { Fragment } from "react";
import { Article } from "../../types/articles/article";
import { ArticleList } from "../ArticleList/ArticleList";
import { ArticlesTabSet } from "../ArticlesTabSet/ArticlesTabSet";
import { Pagination } from "../Pagination/Pagination";
import { Option } from "@hqoss/monads";

export function ArticlesViewer({
    toggleClassName, 
    tabs, 
    tabsTranslation, 
    selectedTab,
    articles, 
    articlesCount,
    currentPage,
    favoriteDisabled,
    onPageChange,
    onTabChange,
    onFavoriteToggleAsync
}: {
    toggleClassName: string;
    tabs: string[];
    tabsTranslation: Map<string, string>;
    selectedTab: string;
    onPageChange: (index: number) => void;
    onTabChange: (tab: string) => void;
    onFavoriteToggleAsync: (article: Article) => Promise<void>
    articles: Option<Article[]>,
    articlesCount: number;
    currentPage: number;
    favoriteDisabled: boolean;
}) {
    return (
        <Fragment>
            <ArticlesTabSet tabs={tabs} selectedTab={selectedTab} tabsTranslation={tabsTranslation} toggleClassName={toggleClassName} onTabChange={onTabChange} />
            <ArticleList articles={articles} onFavoriteToggleAsync={onFavoriteToggleAsync} favoriteDisabled={favoriteDisabled}/>
            <Pagination currentPage={currentPage} count={articlesCount} itemsPerPage={10} onPageChange={onPageChange} />
        </Fragment>
    );
}


