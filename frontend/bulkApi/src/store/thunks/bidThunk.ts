import { Action } from "redux";
import { Bid } from "../../models/Bid";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ACTIONS } from "../actionEnums";
import { IErrorAction, errorActionCreator } from "../errorAction";


export interface IBidAction extends Action {
    type: string;
    bid?: Bid | undefined;
    bids?: Bid[] | undefined;
    message?: string;
    isOkTime?: Date | null; // Time receiving 200 Ok response
}

export function addBidToCartAsync(bid: Bid): ThunkAction<Promise<void>, {}, {}, IBidAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.ADD_BID_TO_CART_REQUEST, message: "Making post request to add bid to cart ..." });

        try {
            const response: Response = await fetch("https://localhost:44397/api/bids/addcart", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bid)
            });

            if (!response.ok) {
                let errorMessage: string = response.statusText + " " + response.url;
                throw new Error(errorMessage);
            }
            
            let createdBid: Bid = (await response.json());
            dispatch({ type: ACTIONS.ADD_BID_TO_CART_RECEIVED, bid: createdBid, message: response.statusText, isOkTime: new Date()});
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }        
        
    }
}

export function updateBidInCartAsync(bid: Bid): ThunkAction<Promise<void>, {}, {}, IBidAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.UPDATE_BID_IN_CART_REQUEST, message: "Making post request to add bid to cart ..." });

        try {
            const response: Response = await fetch("https://localhost:44397/api/bids/updatecart", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bid)
            });

            if (!response.ok) {
                let errorMessage: string = response.statusText + " " + response.url;
                throw new Error(errorMessage);
            }
            
            let updatedBid: Bid = (await response.json());
            dispatch({ type: ACTIONS.UPDATE_BID_IN_CART_RECEIVED, bid: updatedBid, message: response.statusText, isOkTime: new Date()});
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }        
        
    }
}

export function getBidsOfCustomerInCartAsync(customerId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => { 
        dispatch({ type: ACTIONS.GET_BIDSOFCUSTOMER_INCART_REQUEST, message: "Making get request to fetch bids of customer"});

        try {
            const response: Response = await fetch("https://localhost:44397/api/bids/cart/" + customerId);

            if (!response.ok) {
                let errorMessage: string = response.statusText + " " + response.url;
                throw new Error(errorMessage);
            }

            const bids: Bid[] = await response.json();
            dispatch({ type: ACTIONS.GET_BIDSOFCUSTOMER_INCART_RECEIVED, bids: bids, message: response.statusText });
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }
    }
}