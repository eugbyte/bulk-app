import { IBidAction } from "../thunks/bidThunk";
import { cloneDeep } from "lodash";
import { ACTIONS } from "../actionEnums";

const initialState : IBidAction = {
    type: "",
    bid: undefined,
    bids: undefined,
    message: "Initial Message",
    httpMessage: "Initial Response Message",        
}

export default function bidReducer(prevState = initialState, action: IBidAction): IBidAction {
    let newState: IBidAction = cloneDeep(prevState);
    
    newState.type = action.type;
    newState.message = `${action.message} ${(new Date())}`;
    newState.httpMessage = `${action.httpMessage} + ${new Date()}`;

    console.log("in bidReducer. Latest message", newState.message);
    console.log("in bidReducer. Latest api message", newState.httpMessage);
 
    switch(action.type) {    
        case(ACTIONS.ADD_BID_TO_CART_REQUEST):
            return newState;    
        case(ACTIONS.ADD_BID_TO_CART_RECEIVED): 
            newState.bid = action.bid;
            return newState;
        case(ACTIONS.GET_BIDSOFCUSTOMER_INCART_REQUEST):
            return newState;
        case(ACTIONS.GET_BIDSOFCUSTOMER_INCART_RECEIVED):
            newState.bids = action.bids;
            console.log(newState.bids);
            return newState;
        case(ACTIONS.ADD_BID_TO_CART_REQUEST):
            return newState;    
        case(ACTIONS.UPDATE_BID_IN_CART_REQUEST):
            return newState;
        case(ACTIONS.UPDATE_BID_IN_CART_RECEIVED):
            return newState;
        case(ACTIONS.DELETE_BID_IN_CART_REQUEST):
            return newState;
        case(ACTIONS.DELETE_BID_IN_CART_RECEIVED):
            return newState;
        case(ACTIONS.ORDER_BIDS_IN_CART_REQUEST):
            return newState;
        case(ACTIONS.ORDER_BIDS_IN_CART_RECEIVED):
            return newState;
        case(ACTIONS.GET_PENDING_OR_SUCCESSFUL_BIDS_REQUEST):
            return newState;
        case(ACTIONS.GET_PENDING_OR_SUCCESSFUL_BIDS_RECEIVED):
            newState.bids = action.bids;
            return newState;
        default:
            return prevState;
    }
    
}