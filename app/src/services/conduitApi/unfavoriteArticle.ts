import axios from "axios";


export async function unfavoriteArticle(slug: string): Promise<void> {
    await axios.delete(`articles/${slug}/favorite`);
}
