import {date, Decoder, nullable, object, optional, string} from 'decoders';
import {PublicUser} from "./publicUser";

export const LOCALSTORAGE_TOKEN = 'token';

export interface User extends PublicUser {
    email: string;
    token: string;
    accessTokenExpireTime?: Date | undefined;
}

export const userDecoder: Decoder<User> = object({
    email: string,
    token: string,
    username: string,
    accessTokenExpireTime: optional(date),
    bio: nullable(string),
    image: nullable(string),
});


