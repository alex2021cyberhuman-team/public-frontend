import { Article } from "../../../../types/articles/article";
import { ArticleViewModel } from "../ArticleList";

export function onFavoriteToggle(
    index: number,
    model: ArticleViewModel,
    setArticlesModels: React.Dispatch<React.SetStateAction<ArticleViewModel[]>>,
    onFavoriteToggleAsync: (article: Article) => Promise<void>) {
    function startLoading(v: ArticleViewModel): ArticleViewModel {
        const copy = {
            ...v,
            article: {
                ...v.article,
                favorited: !v.article.favorited,
                favoritesCount: v.article.favoritesCount + (v.article.favorited ? -1 : +1)
            },
            isSubmitting: true
        };
        return copy;
    }
    function finishLoading(v: ArticleViewModel): ArticleViewModel {
        const copy = {
            ...v,
            isSubmitting: false
        };
        return copy;
    }
    setArticlesModels((s) => s.map((v, i) => i === index ? startLoading(v) : v));
    onFavoriteToggleAsync(model.article)
        .then(() => setArticlesModels((s) => s.map((v, i) => i === index ? finishLoading(v) : v)));
}
