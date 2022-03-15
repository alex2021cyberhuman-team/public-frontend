import React from 'react';
import { Tag } from "../../types/tags/tag";


export function TagList({ tagList }: { tagList: Tag[]; }) {
    return (
        <ul className='tag-list'>
            {tagList.map((tag) => (
                <li key={tag} className='tag-default tag-pill tag-outline'>
                    {tag}
                </li>
            ))}
        </ul>
    );
}
