import { ACTIONS } from "../actionEnums";
import {cloneDeep} from 'lodash';
import { DiscountScheme } from "../../models/DiscountScheme";
import { IDiscountSchemeAction } from "../thunks/discountSchemeThunk";

const initialState : IDiscountSchemeAction = {
    type: "",
    discountSchemes: null
}

export default function discountSchemeReducer(prevState = initialState, action: IDiscountSchemeAction): IDiscountSchemeAction {
    let newState: IDiscountSchemeAction = cloneDeep(prevState);
    newState.type = action.type;
    newState.message = `${action.message} ${(new Date())}`;
    newState.httpMessage = `${action.httpMessage} + ${new Date()}`;

    switch(action.type) {        
        case(ACTIONS.GET_DISCOUNTSCHEMES_REQUEST):
            console.log(action.message);
            return newState;
        case(ACTIONS.GET_DISCOUNTSCHEMES_RECEIVED):
            console.log("GET_DISCOUNTSCHEMES_RECEIVED");
            let discountSchemes: DiscountScheme[] = action.discountSchemes as DiscountScheme[];
            newState.discountSchemes = discountSchemes;
            return newState;
        case(ACTIONS.GET_DISCOUNTSCHEME_REQUEST):
            console.log(action.message);
            return newState;
        case(ACTIONS.GET_DISCOUNTSCHEME_RECEIVED):
            console.log("ACTIONS.GET_DISCOUNTSCHEME_RECEIVED")
            const discountScheme: DiscountScheme = action.discountScheme as DiscountScheme;
            newState.discountScheme = discountScheme;
            return newState;
        case(ACTIONS.GET_DISCOUNTSCHEME_OF_PRODUCER_REQUEST):
            console.log(action.message);
            return newState;
        case(ACTIONS.GET_DISCOUNTSCHEME_OF_PRODUCER_RECEIVED):
            console.log(action.discountSchemes);
            newState.discountSchemes = action.discountSchemes as DiscountScheme[];
            return newState;
        default:
            return prevState;
    }
    
}