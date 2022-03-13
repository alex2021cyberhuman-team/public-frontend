import {PublicUser} from "./publicUser";

export interface UserSettings extends PublicUser {
    email: string;
    password: string | null;
}