import React from 'react';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';
import localizedStrings from "../../services/localization";
import { TagList } from '../TagList/TagList';
import { Article } from '../../types/articles/article';
export function ArticlePreview({
                                   article: {
                                       createdAt,
                                       favorited,
                                       favoritesCount,
                                       slug,
                                       title,
                                       description,
                                       tagList,
                                       author: {image, username},
                                   },
                                   isSubmitting,
                                   onFavoriteToggle,
                               }: {
    article: Article;
    isSubmitting: boolean;
    onFavoriteToggle?: () => void;
}) {
    return (
        <div className='article-preview'>
            <div className='article-meta'>
                <Link to={`/profile/${username}`} className='author'>
                    <img src={image || undefined}/>
                </Link>
                <div className='info'>
                    <Link to={`/profile/${username}`} className='author'>
                        {username}
                    </Link>
                    <span className='date'>{format(createdAt, 'PP')}</span>
                </div>
                <button
                    className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
                    aria-label={localizedStrings.article.toggleFavorited}
                    disabled={isSubmitting}
                    onClick={onFavoriteToggle}
                >
                    <i className='ion-heart'></i> {favoritesCount}
                </button>
            </div>
            <a href={`/#/article/${slug}`} className='preview-link'>
                <h1>{title}</h1>
                <p>{description}</p>
                <span>{localizedStrings.article.readMore}</span>
                <TagList tagList={tagList}/>
            </a>
        </div>
    );
}


