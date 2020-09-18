import { Action } from "redux";
import { ApiError } from "../../models/ApiError";

export interface IErrorAction extends Action {
    type: string;
    errors: ApiError[] | Error[];
}
 
export function errorAction (type: string, errors?: Error[] | ApiError[]): IErrorAction {
    return {
        type: type,
        errors: errors ?? []
    }
}