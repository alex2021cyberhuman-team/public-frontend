import axios from "axios";
import { User, userDecoder } from "../../types/users/user";


export async function getUser(): Promise<User> {
    const { data } = await axios.get('user');
    const user = userDecoder.verify(data.user);
    return user;
}
