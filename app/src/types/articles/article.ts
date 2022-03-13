import {array, boolean, Decoder, iso8601, number, object, string} from 'decoders';
import {Profile, profileDecoder} from "../users/profile";

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export const articleDecoder: Decoder<Article> = object({
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: array(string),
    createdAt: iso8601,
    updatedAt: iso8601,
    favorited: boolean,
    favoritesCount: number,
    author: profileDecoder,
});


