import { IBidAction } from "../thunks/bidThunk";
import { cloneDeep } from "lodash";
import { ACTIONS } from "../actionEnums";

const initialState : IBidAction = {
    type: "",
    bid: undefined,
    bids: undefined,
    message: "Initial State",
    isOkTime: null
}

export default function bidReducer(prevState = initialState, action: IBidAction): IBidAction {
    let newState: IBidAction = cloneDeep(prevState);
    newState.type = action.type;

    switch(action.type) {    
        case(ACTIONS.ADD_BID_TO_CART_REQUEST):
            console.log(action.message);
            newState.message = action.message;
            return newState;    
        case(ACTIONS.ADD_BID_TO_CART_RECEIVED): 
            console.log(action.message);           
            newState.bid = action.bid;
            newState.message = action.message;
            newState.isOkTime = action.isOkTime;
            return newState;
        case(ACTIONS.GET_BIDSOFCUSTOMER_INCART_REQUEST):
            console.log(action.message);
            newState.message = action.message;
            return newState;
        case(ACTIONS.GET_BIDSOFCUSTOMER_INCART_RECEIVED):
            newState.bids = action.bids;
            console.log(newState.bids);
            newState.message = action.message;
            return newState;
        default:
            return prevState;
    }
    
}