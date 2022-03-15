import { Fragment, useState } from "react";
import { Article } from "../../types/articles/article";
import { Option } from "@hqoss/monads";
import localizedStrings from "../../services/localization";

export interface ArticleViewModel {
    article: Article;
    isSubmitting: boolean;
}

export function ArticleList({ articles, onFavoriteToggleAsync }: { articles: Option<Article[]>; onFavoriteToggleAsync: (article: Article) => Promise<void>; }) {
    const [articleModels, setArticlesModels] = useState<ArticleViewModel[]>([]);
    function onFavoriteToggle(index: number, model: ArticleViewModel) {
        function startLoading(v: ArticleViewModel): ArticleViewModel {
            const copy = {
                ...v,
                article: {
                    ...v.article,
                    favorited: !v.article.favorited,
                    favoritesCount: v.article.favoritesCount + (v.article.favorited ? -1 : +1)
                },
                isSubmitting: true
            }
            return copy;
        }
        function finishLoading(v: ArticleViewModel): ArticleViewModel {
            const copy = {
                ...v,
                isSubmitting: false
            }
            return copy;
        }
        setArticlesModels((s) => s.map((v, i) => i === index ? startLoading(v) : v));
        onFavoriteToggleAsync(model.article)
            .then(() => setArticlesModels((s) => s.map((v,i) => i === index ? finishLoading(v) : v)));
    }

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
            <ArticleListRender articles={articleModels} onFavoriteToggle={onFavoriteToggle} />
        ),
    });
}


function ArticleListRender({ articles, onFavoriteToggle }: { articles: ArticleViewModel[]; onFavoriteToggle: (index: number, model: ArticleViewModel) => void; }) {
    return <Fragment>
        {articles.length === 0 && (
            <div className='article-preview' key={1}>
                {localizedStrings.viewer.notArticles}
            </div>
        )}
        {articles.map(({ article, isSubmitting }, index) => (
            <ArticlePreview
                key={`article-list-item-article${article.slug}`}
                article={article}
                isSubmitting={isSubmitting}
                onFavoriteToggle={isSubmitting ? undefined : onFavoriteToggle(index, article)} />
        ))}
    </Fragment>;
}

