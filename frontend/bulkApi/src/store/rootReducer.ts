import { combineReducers } from 'redux';
import discountSchemeReducer from './reducers/discountSchemeReducer';
import bidReducer from './reducers/bidReducer';
import errorReducer from './reducers/errorReducer';


export const rootReducer = combineReducers({    
    discountSchemeReducer,
    bidReducer,
    errorReducer
});

export type RootState = ReturnType<typeof rootReducer>