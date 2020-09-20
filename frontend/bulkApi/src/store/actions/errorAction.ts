import { Action } from "redux";
import { ApiError } from "../../models/ApiError";
import { ErrorCollection } from "../../models/ErrorCollection";

export interface IErrorAction extends Action {
    type: string;
    error: ApiError | Error | ErrorCollection | null;
}
 
export function errorAction(type: string, error: ApiError | Error | ErrorCollection): IErrorAction {
    return {
        type: type,
        error: error,
    }
}