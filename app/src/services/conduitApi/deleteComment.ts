import axios from "axios";


export async function deleteComment(slug: string, commentId: string): Promise<void> {
    await axios.delete(`articles/${slug}/comments/${commentId}`);
}
