import { IBidAction } from "../thunks/bidThunk";
import { cloneDeep } from "lodash";
import { ACTIONS } from "../actionEnums";

const initialState : IBidAction = {
    type: "",
    bid: undefined,
    bids: undefined,
    messages: ["Initial Message"],
    httpMessages: ["Initial Response Message"],        

}

export default function bidReducer(prevState = initialState, action: IBidAction): IBidAction {
    let newState: IBidAction = cloneDeep(prevState);
    
    newState.type = action.type;
    newState.messages = newState.messages?.concat(action.messages ?? []);
    newState.httpMessages = newState.httpMessages?.concat(action.httpMessages ?? []);

    console.log("in bidReducer. messages", newState.messages);
    console.log("in bidReducer. responseMessages", newState.httpMessages);
 
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
        default:
            return prevState;
    }
    
}