import { IProductAction } from "../thunks/productThunk";
import { cloneDeep } from "lodash";
import { ACTIONS } from "../actionEnums";

const initialState: IProductAction = {
    type: "",
    product: undefined,
    products: undefined,
    message: "",
    httpMessage: "" // For API messages
}

export default function productReducer(prevState = initialState, action: IProductAction): IProductAction {

    let newState: IProductAction = cloneDeep(prevState);
    
    newState.type = action.type;
    newState.message = `${action.message} ${(new Date())}`;
    newState.httpMessage = `${action.httpMessage} + ${new Date()}`;

    switch(action.type) {
        case(ACTIONS.GET_PRODUCTS_REQUEST):
            return newState;
        case (ACTIONS.GET_PRODUCTS_RECEIVED):
            newState.products = action.products;
            return newState;
        case(ACTIONS.CREATE_PRODUCT_REQUEST):
            return newState;
        case(ACTIONS.CREATE_PRODUCT_RECEIVED):
            newState.product = action.product;
            return newState;
        case(ACTIONS.GET_PRODUCT_REQUEST):
            return newState;
        case(ACTIONS.GET_PRODUCT_RECEIVED):
            newState.product = action.product;
            return newState;
        case(ACTIONS.UPDATE_PRODUCT_RECEIVED):
            return newState;
        case(ACTIONS.UPDATE_PRODUCT_REQUEST):
            newState.product = action.product;
            return newState;
        case(ACTIONS.DELETE_PRODUCT_REQUEST):
            return newState;
        case(ACTIONS.DELETE_PRODUCT_RECEIVED):
            newState.product = action.product;
            return newState;
        default:
            return prevState;
    }

}