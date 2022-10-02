import axios from "axios";
import { Profile, profileDecoder } from "../../types/users/profile";


export async function followUser(username: string): Promise<Profile> {
    const { data } = await axios.post(`profiles/${username}/follow`);
    const result = profileDecoder.verify(data.profile);
    return result;
}
