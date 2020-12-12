import { Action } from "redux";
import { Bid } from "../../models/Bid";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ACTIONS } from "../actionEnums";
import { IErrorAction, errorAction } from "../actions/errorAction";
import { ApiError } from "../../models/ApiError";
import { UtilService } from "../../services/UtilService";


export interface IBidAction extends Action {
    type: string;
    bid?: Bid | undefined;
    bids?: Bid[] | undefined;
    message?: string; // All internal messages and for response messages received on GET request
    // Messages for create, read, update and delete
    // need to separate messages and responseMessages
    // some components rely on successfuly update response, before sending another get request to get the latest list
    // if not separate, there will be infinite loop when using useEffect(()=>{}, [messages])
    httpMessage?: string // For API messages
}

export function addBidToCartAsync(bid: Bid): ThunkAction<Promise<void>, {}, {}, IBidAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.ADD_BID_TO_CART_REQUEST, message: "Making post request to add bid to cart ..." });

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "bids/addcart", {
                method: "POST",
                headers: UtilService.getAuthHeader(),
                body: JSON.stringify(bid)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let createdBid: Bid = (await response.json());
            dispatch({ type: ACTIONS.ADD_BID_TO_CART_RECEIVED, bid: createdBid, message: response.statusText,  httpMessage: ACTIONS.HTTP_CREATE_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function updateBidInCartAsync(bid: Bid): ThunkAction<Promise<void>, {}, {}, IBidAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.UPDATE_BID_IN_CART_REQUEST, messages: "Request to update bid in cart" });

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "bids/updatecart", {
                method: "PUT",
                headers: UtilService.getAuthHeader(),
                body: JSON.stringify(bid)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            let updatedBid: Bid = (await response.json());
            dispatch({ type: ACTIONS.UPDATE_BID_IN_CART_RECEIVED, bid: updatedBid, message: response.statusText, httpMessage: ACTIONS.HTTP_UPDATE_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }        
        
    }
}

export function getBidsOfCustomerInCartAsync(customerId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => { 
        dispatch({ type: ACTIONS.GET_BIDSOFCUSTOMER_INCART_REQUEST, messages: "Fetching bids in cart for customer " + customerId});

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "bids/cart/" + customerId, {
                headers: UtilService.getAuthHeader()
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }

            const bids: Bid[] = await response.json();
            dispatch({ type: ACTIONS.GET_BIDSOFCUSTOMER_INCART_RECEIVED, bids: bids, message: response.statusText, httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}

export function deleteBidFromCartAsync(bidId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => { 
        dispatch({ type: ACTIONS.DELETE_BID_IN_CART_REQUEST, messages: "deleting bids in cart with bidId" + bidId});

        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "bids/cart/" + bidId, {
                method: "DELETE",
                headers: UtilService.getAuthHeader()
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }
            
            dispatch({ type: ACTIONS.DELETE_BID_IN_CART_RECEIVED, message: response.statusText, httpMessage: ACTIONS.HTTP_DELETE_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}

export function orderBidsFromCart(bids: Bid[]) {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => { 
        dispatch({ type: ACTIONS.ORDER_BIDS_IN_CART_REQUEST, messages: "ordering bids in cart " + bids.toString()});
        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "bids/cart/order", {
                method: "PUT",
                headers: UtilService.getAuthHeader(),
                body: JSON.stringify(bids)
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }

            dispatch({type: ACTIONS.ORDER_BIDS_IN_CART_RECEIVED, message: response.statusText, httpMessage: ACTIONS.HTTP_UPDATE_ORDER_SUCCESS })
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}

export function getPendingOrSuccessfulBids(customerId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => { 
        dispatch({ type: ACTIONS.GET_PENDING_OR_SUCCESSFUL_BIDS_REQUEST, messages: "getting  PendingOrSuccessfulBids of customer " + customerId});
        try {
            const response: Response = await fetch(UtilService.getApiUrl() + "bids/orders/" + 1, {
                headers: UtilService.getAuthHeader()
            });

            if (!response.ok) {
                let apiError: ApiError = await response.json();
                throw apiError;
            }

            const bids: Bid[] = await response.json();

            dispatch({type: ACTIONS.GET_PENDING_OR_SUCCESSFUL_BIDS_RECEIVED, bids: bids, message: response.statusText, httpMessage: ACTIONS.HTTP_READ_SUCCESS });
        } catch(error) {
            dispatch(errorAction(ACTIONS.ERROR, error));
        }
    }
}