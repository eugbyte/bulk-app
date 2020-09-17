import { ACTIONS } from "../actionEnums";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { DiscountScheme } from "../../models/DiscountScheme";
import { Action } from "redux";
import { IErrorAction, errorActionCreator } from "../actions/errorAction";
import { ApiError } from "../../models/ApiError";

export interface IDiscountSchemeAction extends Action {
    type: string;
    discountSchemes?: DiscountScheme[] | null;
    discountScheme?: DiscountScheme | null;
    message?: string;
}


export function getAllDiscountSchemesWithBidsAsync(): ThunkAction<Promise<void>, {}, {}, IDiscountSchemeAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IDiscountSchemeAction | IErrorAction> ) => {
        dispatch({ type: ACTIONS.GET_DISCOUNTSCHEMES_REQUEST, message: "GET DiscountSchemes..."});
        try {            
            const response: Response = await fetch("https://localhost:44397/api/discountSchemes");

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }

            const discountSchemes: DiscountScheme[] = await response.json();
            dispatch({ type: ACTIONS.GET_DISCOUNTSCHEMES_RECEIVED, discountSchemes: discountSchemes});
        } catch (error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }
        
    }
}

export function getDiscountSchemeAsync(discountSchemeId: number): ThunkAction<Promise<void>, {}, {}, IDiscountSchemeAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IDiscountSchemeAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.GET_DISCOUNTSCHEME_REQUEST, message: "GET DiscountScheme with id: " + discountSchemeId});
        try {            
            const response: Response = await fetch("https://localhost:44397/api/discountSchemes/" + discountSchemeId);
            
            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            const discountScheme: DiscountScheme = await response.json();
            dispatch({ type: ACTIONS.GET_DISCOUNTSCHEME_RECEIVED, discountScheme: discountScheme});
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }
        
    }
}