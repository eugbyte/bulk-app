import { cloneDeep } from "lodash";
import { AuthVM } from "../../models/AuthVM";
import { ACTIONS } from "../actionEnums";
import { IAuthAction } from "../thunks/authThunk";

const initialState : IAuthAction = {
    type: "",
    identityUser: undefined,
    message: "Initial Message",
    httpMessage: "Initial Response Message",        
}

export default function authReducer(prevState = initialState, action: IAuthAction): IAuthAction {
    let newState: IAuthAction = cloneDeep(prevState);
    
    newState.type = action.type;
    newState.message = `${action.message} ${(new Date())}`;
    newState.httpMessage = `${action.httpMessage} + ${new Date()}`;

    //console.log("in bidReducer. Latest message", newState.message);
    //console.log("in bidReducer. Latest api message", newState.httpMessage);
 
    switch(action.type) {    
        case(ACTIONS.LOGIN_REQUEST):
            return newState;
        case(ACTIONS.LOGIN_RECEIVED):
            let authVM: AuthVM = action.authVM as AuthVM;
            let isAuth: boolean = authVM.isAuth;
            let jwt: string = authVM.jwt;
            let userId: string = authVM.id;
            localStorage.setItem("userId", userId);
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("isAuth", isAuth.toString());
            return newState;
        default:
            return prevState;            
    }

}