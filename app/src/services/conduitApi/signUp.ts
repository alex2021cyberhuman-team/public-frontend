import { Ok, Result } from '@hqoss/monads';
import axios from "axios";
import { User, userDecoder } from "../../types/users/user";
import { GenericErrors } from "../../types/errors/error";
import { UserForRegistration } from "../../types/users/userForRegistration";
import { catchUnprocessableEntity } from './catchUnprocessableEntity';


export async function signUp(user: UserForRegistration): Promise<Result<User, GenericErrors>> {
    try {
        const { data } = await axios.post('users', { user });
        const result = userDecoder.verify(data.user);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception);
    }
}
