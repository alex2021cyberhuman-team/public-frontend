import { Ok, Result } from '@hqoss/monads';
import axios from "axios";
import { User, userDecoder } from "../../types/users/user";
import { GenericErrors } from "../../types/errors/error";
import { UserSettings } from "../../types/users/userSettings";
import { catchUnprocessableEntity } from './catchUnprocessableEntity';


export async function updateSettings(user: UserSettings): Promise<Result<User, GenericErrors>> {
    try {
        const { data } = await axios.put('user', { user });
        const result = userDecoder.verify(data.user);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception);
    }
}
