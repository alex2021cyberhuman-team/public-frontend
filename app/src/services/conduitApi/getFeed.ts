import axios from "axios";
import { ArticlesFilters } from "../../types/articles/articlesFilters";
import { MultipleArticles, multipleArticlesDecoder } from "../../types/articles/multipleArticles";
import { objectToQueryString } from "../../types/infrastructure/object";
import { FeedFilters } from "../../types/articles/feedFilters";


export async function getFeed(filters: FeedFilters = {}): Promise<MultipleArticles> {
    const finalFilters: ArticlesFilters = {
        limit: 10,
        offset: 0,
        ...filters,
    };
    const response = await axios.get(`articles/feed?${objectToQueryString(finalFilters)}`);
    const articles = multipleArticlesDecoder.verify(response.data);
    return articles;
}
