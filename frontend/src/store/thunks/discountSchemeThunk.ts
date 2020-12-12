import { ACTIONS } from "../actionEnums";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { DiscountScheme } from "../../models/DiscountScheme";
import { Action } from "redux";
import { IErrorAction, errorAction } from "../actions/errorAction";
import { ApiError } from "../../models/ApiError";
import { UtilService } from "../../services/UtilService";

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
            
            const response: Response = await fetch(UtilService.getApiUrl() + "discountSchemes", {
                headers: UtilService.getAuthHeader()
            });

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
            const response: Response = await fetch(UtilService.getApiUrl() + "discountSchemes/" + discountSchemeId, {
                headers: UtilService.getAuthHeader()
            });
            
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
            const response: Response = await fetch(UtilService.getApiUrl() + "discountSchemes/producer/" + producerId, {
                headers: UtilService.getAuthHeader()
            });

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

export function createDiscountSchemeAsync(discountScheme: DiscountScheme): ThunkAction<Promise<void>, {}, {}, IDiscountSchemeAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IDiscountSchemeAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.CREATE_DISCOUNTSCHEME_REQUEST, message: "Creating Discount Scheme" });
        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "discountSchemes", {
                method: "POST",
                headers: UtilService.getAuthHeader(),
                body: JSON.stringify(discountScheme)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            const createdDiscountScheme: DiscountScheme = await response.json();
            dispatch({ type: ACTIONS.CREATE_DISCOUNTSCHEME_RECEIVED, discountScheme: createdDiscountScheme, httpMessage: ACTIONS.HTTP_CREATE_SUCCESS });

        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}

export function deleteDiscountSchemeAsync(discountSchemeId: number): ThunkAction<Promise<void>, {}, {}, IDiscountSchemeAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IDiscountSchemeAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.DELETE_DISCOUNTSCHEME_REQUEST, message: "Deleting Discount Scheme" });
        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "discountSchemes/" + discountSchemeId, {
                method: "DELETE",
                headers: UtilService.getAuthHeader()
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            const deletedDiscountScheme: DiscountScheme = await response.json();
            dispatch({ type: ACTIONS.DELETE_DISCOUNTSCHEME_RECEIVED, discountScheme: deletedDiscountScheme, httpMessage: ACTIONS.HTTP_DELETE_SUCCESS });

        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}
