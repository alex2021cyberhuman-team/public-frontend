import axios from "axios";
import { Comment, commentsDecoder } from "../../types/comments/comment";


export async function getArticleComments(slug: string): Promise<Comment[]> {
    const { data } = await axios.get(`articles/${slug}/comments`);
    const comments = commentsDecoder.verify(data.comments);
    return comments;
}
