import { IAction, ACTIONS } from "./actions";
import {cloneDeep} from 'lodash';

const initialState : IAction = {
    type: "",
    value: 0
}

export default function reducer(prevState = initialState, action: IAction): IAction {
    console.log("in reducer", action.type);
    let newState: IAction = cloneDeep(prevState);

    switch(action.type) {
        case(ACTIONS.INCREMENT):
            let receivedValue: number = action.value as number; 
            newState.value = (newState.value as number) + receivedValue;
            console.log(newState);
            return newState;
        default:
            return prevState;
    }
    
}