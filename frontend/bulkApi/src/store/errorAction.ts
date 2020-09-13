import { Action } from "redux";

export interface IErrorAction extends Action {
    type: string;
    error: Error | null;
}
 
export function errorActionCreator (type: string, error?: Error): IErrorAction {
    return {
        type: type,
        error: error ?? null
    }
}