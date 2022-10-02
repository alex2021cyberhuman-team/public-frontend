import axios from "axios";
import { Article, articleDecoder } from "../../types/articles/article";


export async function getArticle(slug: string): Promise<Article> {
    const { data } = await axios.get(`articles/${slug}`);
    const result = articleDecoder.verify(data.article);
    return result;
}
