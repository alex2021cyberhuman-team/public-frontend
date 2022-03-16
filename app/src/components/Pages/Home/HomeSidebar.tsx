import React from 'react';
import { Option } from '@hqoss/monads';
import {useLocalization} from '../../../services/localization/reactLocalization';
import { Tag } from '../../../types/tags/tag';

export function HomeSidebar({ 
    tags, 
    onTagChange 
}: { 
    tags: Option<Tag[]>; 
    onTagChange: (selected: Tag) => void
}) {    
    const {localization} = useLocalization();
    return (
        <div className='sidebar'>
            <p>{localization.home.tags.popularTags}</p>

            {tags.match({
                none: () => <span>{localization.home.tags.load}</span>,
                some: (tags) => (
                    <div className='tag-list'>
                        {' '}
                        {tags.map((tag) => (
                            <button key={`tag-list-item-${tag}`} className='tag-pill tag-default' onClick={() => onTagChange(tag)}>
                                {tag}
                            </button>
                        ))}{' '}
                    </div>
                ),
            })}
        </div>
    );
}
