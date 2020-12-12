import { IErrorAction } from "../actions/errorAction";
import { ACTIONS } from "../actionEnums";

const initialState : IErrorAction = {
    type: "",
    error: null
}

export default function errorReducer(prevState = initialState, action: IErrorAction): IErrorAction {
    const { type, error } = action;
    // Must make sure to clear all errors before redirecting, otherwise errors will persist even at the next component
    if (type === ACTIONS.CLEAR_ERROR) {
        return initialState;
    } else if (error) {
        console.log("error received in errorReducer:", error);
        //When you go to a new component, you want the previous errors to disappear
        return {
            type: type,
            error: action.error
        }         
    }

    //For any start and finished actions that don't have errors we return the current state.
    return prevState; 
}