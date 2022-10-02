import { useState } from "react";
import { Article } from "../../../types/articles/article";
import { Option } from "@hqoss/monads";
import {useLocalization} from "../../../services/localization/reactLocalization";
import { onFavoriteToggle } from "./actions/onFavoriteToggle";
import { ArticleListRender } from "../ArticleListRender/ArticleListRender";

export interface ArticleViewModel {
    article: Article;
    isSubmitting: boolean;
}

export function ArticleList({ articles, onFavoriteToggleAsync, favoriteDisabled }: { 
    articles: Option<ArticleViewModel[]>; 
    onFavoriteToggleAsync: (index: number, model: ArticleViewModel) => Promise<void>; 
    favoriteDisabled: boolean;
}) {
    const {localization} = useLocalization();

    return articles.match({
        none: () => (
            <div className='article-preview' key={1}>
                {localization.viewer.loading}
            </div>
        ),
        some: (ar) => (
            <ArticleListRender articles={ar} favoriteDisabled={favoriteDisabled} onFavoriteToggle={(index, model) => onFavoriteToggleAsync(index, model)} />
        ),
    });
}
