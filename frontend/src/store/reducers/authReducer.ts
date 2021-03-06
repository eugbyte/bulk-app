import { cloneDeep } from "lodash";
import { ACTIONS } from "../actionEnums";
import { IAuthAction } from "../thunks/authThunk";

const initialState : IAuthAction = {
    type: "",
    identityUser: undefined,
    message: "Initial Message",
    httpMessage: "Initial Response Message",   
    authVM: undefined     
}

export default function authReducer(prevState = initialState, action: IAuthAction): IAuthAction {

    let newState: IAuthAction = cloneDeep(prevState);
    
    newState.authVM = cloneDeep(action.authVM);
    newState.type = action.type;
    newState.message = `${action.message} ${(new Date())}`;
    newState.httpMessage = `${action.httpMessage} + ${new Date()}`;
 
    switch(action.type) {    
        case(ACTIONS.LOGIN_REQUEST):
            return newState;
        case(ACTIONS.LOGIN_SUCCESS): 
            localStorage.setItem("authVM", JSON.stringify(action.authVM)); 
            return newState;
        case(ACTIONS.LOGIN_FAILED):
            return newState;
        case(ACTIONS.LOGOUT):
            localStorage.removeItem("authVM");
            newState.message = ACTIONS.LOGOUT_SUCCESS;
            return newState;
        default:
            return prevState;            
    }

}