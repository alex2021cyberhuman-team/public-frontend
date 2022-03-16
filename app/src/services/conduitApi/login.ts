import { Ok, Result } from '@hqoss/monads';
import axios from "axios";
import { User, userDecoder } from "../../types/users/user";
import { GenericErrors } from "../../types/errors/error";
import { UserForLogin } from '../../types/users/userForLogin';
import { catchUnprocessableEntity } from './catchUnprocessableEntity';


export async function login(user: UserForLogin): Promise<Result<User, GenericErrors>> {
    try {
        const { data } = await axios.post('users/login', { user });
        const result = userDecoder.verify(data.user);
        return Ok(result);
    } catch (exception) {
        return catchUnprocessableEntity(exception);
    }
}
