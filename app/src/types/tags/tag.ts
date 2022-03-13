import {array, object, string} from "decoders";

export type Tag = string;

export interface Tags {
    tags: Tag[]
}

export const tagsDecoder = object({
    tags: array(string)
});