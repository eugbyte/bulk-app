import { Action } from "redux";
import { Bid } from "../../models/Bid";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ACTIONS } from "../actionEnums";
import { IErrorAction, errorActionCreator } from "../errorAction";


export interface IBidAction extends Action {
    type: string;
    bid?: Bid | undefined;
    bids?: Bid[] | undefined;
    messages?: string[]; // All internal messages and for response messages received on GET request
    // Messages for create, update and delete
    // need to separate messages and responseMessages
    // some components rely on successfuly update response, before sending another get request to get the latest list
    // if not separate, there will be infinite loop when using useEffect(()=>{}, [messages])
    responseMessages?: string[] // For API messages except for GET request
}

export function addBidToCartAsync(bid: Bid): ThunkAction<Promise<void>, {}, {}, IBidAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.ADD_BID_TO_CART_REQUEST, messages: ["Making post request to add bid to cart ..."] });

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
            dispatch({ type: ACTIONS.ADD_BID_TO_CART_RECEIVED, bid: createdBid, messages: [response.statusText],  responseMessages: [ACTIONS.CREATE_SUCCESS] });
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }        
        
    }
}

export function updateBidInCartAsync(bid: Bid): ThunkAction<Promise<void>, {}, {}, IBidAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.UPDATE_BID_IN_CART_REQUEST, messages: ["Request to update bid in cart"] });

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
            dispatch({ type: ACTIONS.UPDATE_BID_IN_CART_RECEIVED, bid: updatedBid, messages: [response.statusText], responseMessages: [ACTIONS.UPDATE_SUCCESS] });
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }        
        
    }
}

export function getBidsOfCustomerInCartAsync(customerId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, IBidAction | IErrorAction>) => { 
        dispatch({ type: ACTIONS.GET_BIDSOFCUSTOMER_INCART_REQUEST, messages: ["Fetching bids in cart for customer " + customerId]});

        try {
            const response: Response = await fetch("https://localhost:44397/api/bids/cart/" + customerId);

            if (!response.ok) {
                let errorMessage: string = response.statusText + " " + response.url;
                throw new Error(errorMessage);
            }

            const bids: Bid[] = await response.json();
            dispatch({ type: ACTIONS.GET_BIDSOFCUSTOMER_INCART_RECEIVED, bids: bids, messages: [response.statusText], responseMessages: [ACTIONS.READ_SUCCESS] });
        } catch(error) {
            dispatch(errorActionCreator(ACTIONS.ERROR, error));
        }
    }
}