import { Fragment } from "react";
import localizedStrings from "../../../services/localization";
import { ArticlePreview } from "../ArticlePreview/ArticlePreview";
import { ArticleViewModel } from "../ArticleList/ArticleList";

export function ArticleListRender({ articles, onFavoriteToggle, favoriteDisabled }: { 
    articles: ArticleViewModel[];
     onFavoriteToggle: (index: number, model: ArticleViewModel) => void; 
     favoriteDisabled: boolean;
}) {
    return <Fragment>
        {articles.length === 0 && (
            <div className='article-preview' key={1}>
                {localizedStrings.viewer.notArticles}
            </div>
        )}
        {articles.map((model, index) => (
            <ArticlePreview
                key={`article-list-item-article-${model.article.slug}`}
                article={model.article}
                isSubmitting={model.isSubmitting}
                favoriteDisabled={favoriteDisabled}
                onFavoriteToggle={() => {
                    if (!model.isSubmitting && !favoriteDisabled) {
                        onFavoriteToggle(index, model);
                    }
                }} />
        ))}
    </Fragment>;
}
