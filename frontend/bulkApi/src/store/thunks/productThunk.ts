import { Action } from "redux";
import { Product } from "../../models/Product";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ACTIONS } from "../actionEnums";
import { IErrorAction, errorAction } from "../actions/errorAction";
import { ApiError } from "../../models/ApiError";
import { UtilService } from "../../services/UtilService";

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
            const response: Response = await fetch(UtilService.getApiUrl() + "products/producer/" + producerId, {
                headers: UtilService.getAuthHeader()
            });

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

export function getProductAsync(productId: number): ThunkAction<Promise<void>, {}, {}, IProductAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IProductAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.GET_PRODUCT_REQUEST, message: "Getting products of producer ..." });

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "products/" + productId, {
                headers: UtilService.getAuthHeader()
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let product: Product = (await response.json());
            console.log("In productThunk", product)
            dispatch({ type: ACTIONS.GET_PRODUCT_RECEIVED, product: product, message: response.statusText,  httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function createProductsAsync(product: Product): ThunkAction<Promise<void>, {}, {}, IProductAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IProductAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.GET_PRODUCTS_REQUEST, message: "Creating product ..." });

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "products/", {
                method: "POST",
                headers: UtilService.getAuthHeader(),
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                console.log("apiError in createProductAsync", apiError);
                throw apiError;
            }
            
            let createdProduct: Product = (await response.json());
            dispatch({ type: ACTIONS.GET_PRODUCTS_RECEIVED, product: createdProduct, message: response.statusText,  httpMessage: ACTIONS.HTTP_CREATE_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function updateProductAsync(productId: number, product: Product): ThunkAction<Promise<void>, {}, {}, IProductAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IProductAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.UPDATE_PRODUCT_REQUEST, message: "Updating product ..." });

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "products/" + productId, {
                method: "PUT",
                headers: UtilService.getAuthHeader(),
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let updatedProduct: Product = (await response.json());
            console.log("updatedProduct", updatedProduct);
            dispatch({ type: ACTIONS.GET_PRODUCTS_RECEIVED, product: updatedProduct, message: response.statusText,  httpMessage: ACTIONS.HTTP_UPDATE_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function deleteProductAsync(productId: number): ThunkAction<Promise<void>, {}, {}, IProductAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IProductAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.DELETE_PRODUCT_REQUEST, message: "Deleting product ..." });

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "products/" + productId, {
                method: "DELETE",
                headers: UtilService.getAuthHeader()
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let deletedProduct: Product = (await response.json());
            console.log("deletedProduct", deletedProduct);
            dispatch({ type: ACTIONS.DELETE_PRODUCT_RECEIVED, product: deletedProduct, message: response.statusText,  httpMessage: ACTIONS.HTTP_DELETE_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}
