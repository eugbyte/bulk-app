import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Action } from "redux";
import { ApiError } from "../../models/ApiError";
import { AuthVM } from "../../models/AuthVM";
import { IdentityUser } from "../../models/IdentityUser";
import { ACTIONS } from "../actionEnums";
import { errorAction, IErrorAction } from "../actions/errorAction";

export interface IAuthAction extends Action {
    type: string;
    identityUser?: IdentityUser | undefined;
    message?: string; // All internal messages and for response messages received on GET request 
    authVM?: AuthVM;
    httpMessage?: string // For API messages
}

 export function loginAsync(identityUser: IdentityUser): ThunkAction<Promise<void>, {}, {}, IAuthAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IAuthAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.LOGIN_REQUEST, message: "Attempting login..."});

        try {
            const response: Response = await fetch("https://localhost:44397/api/auth/signIn", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(identityUser)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let authVM: AuthVM = (await response.json());
            console.log("IAuthVM", authVM);
            dispatch({ type: ACTIONS.LOGIN_RECEIVED, 
                authVM: authVM,
                message: response.statusText,  
                httpMessage: ACTIONS.HTTP_UPDATE_SUCCESS 
            });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function logoutSync(): IAuthAction {
    let authVM: AuthVM = new AuthVM("USER");
    return { type: ACTIONS.LOGOUT, message: "Logout ...", authVM: authVM}; 
}

export function logoutAsync(): ThunkAction<Promise<void>, {}, {}, IAuthAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IAuthAction | IErrorAction>) => {
        let authVM: AuthVM = new AuthVM("USER");
        dispatch({ type: ACTIONS.LOGOUT, message: "Logout ...", authVM: authVM});        
    }
}