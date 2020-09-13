import { Action } from "redux";

export enum ACTIONS {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT"
}

export interface IAction extends Action {
    type: string,
    value: {}
}
