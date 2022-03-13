import {Article, articleDecoder} from "./article";
import {array, Decoder, number, object} from "decoders";

export interface MultipleArticles {
    articles: Article[];
    articlesCount: number;
}

export const multipleArticlesDecoder: Decoder<MultipleArticles> = object({
    articles: array(articleDecoder),
    articlesCount: number,
});