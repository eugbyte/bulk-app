import { ACTIONS } from "../actionEnums";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { DiscountScheme } from "../../models/DiscountScheme";
import { Action } from "redux";
import { IErrorAction, errorAction } from "../actions/errorAction";
import { ApiError } from "../../models/ApiError";

export interface IDiscountSchemeAction extends Action {
    type: string;
    discountSchemes?: DiscountScheme[] | null;
    discountScheme?: DiscountScheme | null;
    message?: string;
    httpMessage?: string;
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
            dispatch({ type: ACTIONS.GET_DISCOUNTSCHEMES_RECEIVED, discountSchemes: discountSchemes, httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch (error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
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
            dispatch({ type: ACTIONS.GET_DISCOUNTSCHEME_RECEIVED, discountScheme: discountScheme, httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
        
    }
}

export function getDiscountSchemesWithBidOfProducer(producerId: number): ThunkAction<Promise<void>, {}, {}, IDiscountSchemeAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IDiscountSchemeAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.GET_DISCOUNTSCHEME_OF_PRODUCER_REQUEST, message: "GET DiscountScheme of producer id: " + producerId });
        try {
            const response: Response = await fetch("https://localhost:44397/api/discountSchemes/producer/" + producerId);

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            const discountSchemes: DiscountScheme[] = await response.json();
            dispatch({ type: ACTIONS.GET_DISCOUNTSCHEME_OF_PRODUCER_RECEIVED, discountSchemes: discountSchemes, httpMessage: ACTIONS.HTTP_READ_SUCCESS });

        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}