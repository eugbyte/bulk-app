import { Action } from "redux";
import { ApiError } from "../../models/ApiError";

export interface IErrorAction extends Action {
    type: string;
    error: ApiError | Error | null;
}
 
export function errorActionCreator (type: string, error?: Error | ApiError): IErrorAction {
    return {
        type: type,
        error: error ?? null
    }
}