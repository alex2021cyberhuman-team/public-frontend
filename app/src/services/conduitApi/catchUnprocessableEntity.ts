import { Err } from '@hqoss/monads';
import axios from "axios";
import { GenericErrors, genericErrorsDecoder } from "../../types/errors/error";
import { ResErr } from "@hqoss/monads/dist/lib/result/result";
import { VALIDATION_ERROR_STATUS } from './axiosSettings';

export function catchUnprocessableEntity<T>(exception: any): ResErr<T, GenericErrors> {
    if (exception &&
        axios.isAxiosError(exception) &&
        exception.response &&
        exception.response?.status === VALIDATION_ERROR_STATUS) {
        const genericErrors = genericErrorsDecoder.verify(exception.response.data.errors);
        return Err(genericErrors);
    }
    throw exception;
}
