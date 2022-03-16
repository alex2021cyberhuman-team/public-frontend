import axios from "axios";


export async function deleteArticle(slug: string): Promise<void> {
    await axios.delete(`articles/${slug}`);
}
