import { Ok, Result } from '@hqoss/monads';
import axios from "axios";
import { GenericErrors } from "../../types/errors/error";
import { Article, articleDecoder } from "../../types/articles/article";
import { ArticleForEditor } from "../../types/articles/articleForEditor";
import { catchUnprocessableEntity } from './catchUnprocessableEntity';


export async function createArticle(article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
    try {
        const { data } = await axios.post('articles', { article });
        const result = articleDecoder.verify(data.article);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception);
    }
}