import React from 'react';
import { Option } from '@hqoss/monads';
import localizedStrings from '../../../services/localization';
import { Tag } from '../../../types/tags/tag';

export function HomeSidebar({ tags, onTagChange }: { tags: Option<Tag[]>; onTagChange: (selected: Tag) => void}) {
    return (
        <div className='sidebar'>
            <p>{localizedStrings.home.tags.popularTags}</p>

            {tags.match({
                none: () => <span>{localizedStrings.home.tags.load}</span>,
                some: (tags) => (
                    <div className='tag-list'>
                        {' '}
                        {tags.map((tag) => (
                            <a key={`tag-list-item-${tag}`} href='#' className='tag-pill tag-default' onClick={() => onTagChange(tag)}>
                                {tag}
                            </a>
                        ))}{' '}
                    </div>
                ),
            })}
        </div>
    );
}
