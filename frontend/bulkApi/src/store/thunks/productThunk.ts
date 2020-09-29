import { Action } from "redux";
import { Product } from "../../models/Product";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ACTIONS } from "../actionEnums";
import { IErrorAction, errorAction } from "../actions/errorAction";
import { ApiError } from "../../models/ApiError";

export interface IProductAction extends Action {
    type: string;
    product?: Product | undefined;
    products?: Product[] | undefined;
    message?: string;  
    httpMessage?: string // For API messages
}

export function getProductsAsync(producerId: number): ThunkAction<Promise<void>, {}, {}, IProductAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IProductAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.GET_PRODUCTS_REQUEST, message: "Getting products of producer ..." });

        try {
            const response: Response = await fetch("https://localhost:44397/api/products/producer/" + producerId);

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let products: Product[] = (await response.json());
            dispatch({ type: ACTIONS.GET_PRODUCTS_RECEIVED, products: products, message: response.statusText,  httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function createProductsAsync(product: Product): ThunkAction<Promise<void>, {}, {}, IProductAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IProductAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.GET_PRODUCTS_REQUEST, message: "Getting products of producer ..." });

        try {
            const response: Response = await fetch("https://localhost:44397/api/products/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let createdProduct: Product = (await response.json());
            dispatch({ type: ACTIONS.GET_PRODUCTS_RECEIVED, product: createdProduct, message: response.statusText,  httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}
