import { IBidAction } from "../thunks/bidThunk";
import { cloneDeep } from "lodash";
import { ACTIONS } from "../actionEnums";

const initialState : IBidAction = {
    type: "",
    bid: undefined,
    bids: undefined,
    messages: ["Initial Message"],
    responseMessages: ["Initial Response Message"],        

}

export default function bidReducer(prevState = initialState, action: IBidAction): IBidAction {
    let newState: IBidAction = cloneDeep(prevState);
    newState.type = action.type;
    newState.messages = newState.messages?.concat(action.messages ?? []);
    newState.responseMessages = newState.responseMessages?.concat(action.responseMessages ?? []);
    console.log("in bidReducer. messages", newState.messages);
    console.log("in bidReducer. responseMessages", newState.responseMessages);
 
    switch(action.type) {    
        case(ACTIONS.ADD_BID_TO_CART_REQUEST):
            console.log(action.messages);
            
            return newState;    
        case(ACTIONS.ADD_BID_TO_CART_RECEIVED): 
            console.log(action.messages);           
            newState.bid = action.bid;
            return newState;
        case(ACTIONS.GET_BIDSOFCUSTOMER_INCART_REQUEST):
            console.log(action.messages);
            return newState;
        case(ACTIONS.GET_BIDSOFCUSTOMER_INCART_RECEIVED):
            newState.bids = action.bids;
            console.log(newState.bids);
            return newState;
        case(ACTIONS.ADD_BID_TO_CART_REQUEST):
            console.log(action.messages);
            return newState;    
        case(ACTIONS.UPDATE_BID_IN_CART_RECEIVED):
            return newState;
        default:
            return prevState;
    }
    
}