import {ACTIONS, IAction} from "../actions";
import { ThunkDispatch } from 'redux-thunk'

export function incrementAsync(value: number) {
    console.log("in thunk");
    return async (dispatch: ThunkDispatch<{}, {}, IAction>) => {
        await mockConnectionToBackend(1000);
        console.log("awaited");
        dispatch({ type: ACTIONS.INCREMENT, value: value})

    }
}
 

async function mockConnectionToBackend(msec: number) {
    console.log("connecting to backend")
    return new Promise(resolve => setTimeout(resolve, msec));
}