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
            
            // If authentication succeeds, server sends authVM. Otherwise, AuthenticationException raised
            let authVM: AuthVM = await response.json();
            console.log("IAuthVM", authVM);

            if (authVM.isAuthenticated === false) {
                authVM.userName = "ACCOUNT";
                dispatch({ type: ACTIONS.LOGIN_FAILED,
                    authVM: authVM,
                    message: response.statusText,  
                    httpMessage: ACTIONS.HTTP_UPDATE_SUCCESS 
                });
              return;
            }

            dispatch({ type: ACTIONS.LOGIN_SUCCESS, 
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
    let authVM: AuthVM = new AuthVM("ACCOUNT");
    authVM.isAuthenticated = "UNTOUCHED";
    return { type: ACTIONS.LOGOUT, message: "Logout ...", authVM: authVM}; 
}
