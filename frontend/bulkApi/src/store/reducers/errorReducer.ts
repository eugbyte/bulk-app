import { IErrorAction } from "../actions/errorAction";
import { ACTIONS } from "../actionEnums";

const initialState : IErrorAction = {
    type: "",
    errors: []
}

export default function errorReducer(prevState = initialState, action: IErrorAction): IErrorAction {
    const { type, errors } = action;
    // Must make sure to clear all errors before redirecting, otherwise errors will persist even at the next component
    if (type === ACTIONS.CLEAR_ERROR) {
        return initialState;
    } else if (errors?.length > 0 ) {
        console.log("error received in errorReducer:", errors);
        //When you go to a new component, you want the previous errors to disappear
        let newErrors = [...prevState.errors, ...action.errors];
        return {
            type: type,
            errors: newErrors
        }         
    }

    //For any start and finished actions that don't have errors we return the current state.
    return prevState; 
}