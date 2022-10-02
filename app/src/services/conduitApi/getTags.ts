import axios from "axios";
import { Tags, tagsDecoder } from "../../types/tags/tag";


export async function getTags(): Promise<Tags> {
    const response = await axios.get('tags');
    const tags = tagsDecoder.verify(response.data);
    return tags;
}
