import axios from "axios";


export async function favoriteArticle(slug: string): Promise<void> {
    await axios.post(`articles/${slug}/favorite`);
}
