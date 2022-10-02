import axios from "axios";
import { Profile, profileDecoder } from "../../types/users/profile";


export async function getProfile(username: string): Promise<Profile> {
    const { data } = await axios.get(`profiles/${username}`);
    const result = profileDecoder.verify(data.profile);
    return result;
}
