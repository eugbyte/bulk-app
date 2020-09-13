import { IErrorAction } from "../errorAction";
import { ACTIONS } from "../actionEnums";

const initialState : IErrorAction = {
    type: "",
    error: null
}

export default function errorReducer(prevState = initialState, action: IErrorAction): IErrorAction {
    const { type, error } = action;
    if (type === ACTIONS.CLEAR_ERROR) {
        return initialState;
    } else if (error) {
        console.log("error received in errorReducer:", error);
        return {
            type: type,
            error: error
        }
    }

    //For any start and finished actions that don't have errors we return the current state.
    return prevState; 
}