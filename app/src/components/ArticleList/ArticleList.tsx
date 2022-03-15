import { useState } from "react";
import { Article } from "../../types/articles/article";
import { Option } from "@hqoss/monads";
import localizedStrings from "../../services/localization";
import { onFavoriteToggle } from "./onFavoriteToggle";
import { ArticleListRender } from "./ArticleListRender";

export interface ArticleViewModel {
    article: Article;
    isSubmitting: boolean;
}

export function ArticleList({ articles, onFavoriteToggleAsync, favoriteDisabled }: { 
    articles: Option<Article[]>; 
    onFavoriteToggleAsync: (article: Article) => Promise<void>; 
    favoriteDisabled: boolean;
}) {
    const [articleModels, setArticlesModels] = useState<ArticleViewModel[]>([]);


    if (articles.isSome()) {
        const articleModelsFromProps = articles.unwrap().map(article => ({ article, isSubmitting: false }));
        setArticlesModels(() => articleModelsFromProps);
    }


    return articles.match({
        none: () => (
            <div className='article-preview' key={1}>
                {localizedStrings.viewer.loading}
            </div>
        ),
        some: () => (
            <ArticleListRender articles={articleModels} favoriteDisabled={favoriteDisabled} onFavoriteToggle={(index, model) => onFavoriteToggle(index, model, setArticlesModels, onFavoriteToggleAsync)} />
        ),
    });
}
