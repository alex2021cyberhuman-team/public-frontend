import axios from "axios";
import { ArticlesFilters } from "../../types/articles/articlesFilters";
import { MultipleArticles, multipleArticlesDecoder } from "../../types/articles/multipleArticles";
import { objectToQueryString } from "../../types/infrastructure/object";
import { ARTICLES_DEFAULT_LIMIT } from './axiosSettings';


export async function getArticles(filters: ArticlesFilters = {}): Promise<MultipleArticles> {
    const finalFilters: ArticlesFilters = {
        limit: ARTICLES_DEFAULT_LIMIT,
        offset: 0,
        ...filters,
    };
    const response = await axios.get(`articles?${objectToQueryString(finalFilters)}`);
    const articles = multipleArticlesDecoder.verify(response.data);
    return articles;
}
