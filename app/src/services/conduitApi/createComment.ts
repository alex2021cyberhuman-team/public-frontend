import axios from "axios";
import { Comment, commentDecoder } from "../../types/comments/comment";


export async function createComment(slug: string, body: string): Promise<Comment> {
    const { data } = await axios.post(`articles/${slug}/comments`, { comment: { body } });
    const comment = commentDecoder.verify(data.comments);
    return comment;
}
