import {string} from "decoders";

export interface PublicUser {
    username: string;
    bio: string | null;
    image: string | null;
}