import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {useLocalization} from "../../../services/localization/reactLocalization";
import { TagList } from '../TagList/TagList';
import { Article } from '../../../types/articles/article';
import SmallAvatar from '../Avatar/SmallAvatar';
import { assignLangHref, getLangHref } from '../NavItem/NavItem';

export function ArticlePreview({
    article: {
        createdAt,
        favorited,
        favoritesCount,
        slug,
        title,
        description,
        tagList,
        author: { image, username },
    },
    isSubmitting,
    favoriteDisabled,
    onFavoriteToggle,
}: {
    article: Article;
    isSubmitting: boolean;
    onFavoriteToggle: () => void;
    favoriteDisabled: boolean;
}) {
    const {language, localization} = useLocalization();
    return (
        <div className='article-preview'>
            <div className='article-meta'>
                <Link to={`/profile/${username}`} className='author'>
                    <SmallAvatar image={image} username={username} />
                </Link>
                <div className='info'>
                    <a href={getLangHref(language, `/profile/${username}`)} className='author'>
                        {username}
                    </a>
                    <span className='date'>{format(createdAt, 'PP')}</span>
                </div>
                <button
                    className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
                    aria-label={localization.article.toggleFavorited}
                    disabled={isSubmitting || favoriteDisabled}
                    onClick={() => onFavoriteToggle()}
                >
                    <i className='ion-heart'></i> {favoritesCount}
                </button>
            </div>
            <a href={getLangHref(language, `/article/${slug}`)} className='preview-link'>
                <h1>{title}</h1>
                <p>{description}</p>
                <span>{localization.article.readMore}</span>
                <TagList tagList={tagList} />
            </a>
        </div>
    );
}


