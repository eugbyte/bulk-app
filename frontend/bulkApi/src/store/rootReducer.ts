import { combineReducers } from 'redux';
import discountSchemeReducer from './reducers/discountSchemeReducer';
import bidReducer from './reducers/bidReducer';
import productReducer from './reducers/productReducer';
import errorReducer from './reducers/errorReducer';


export const rootReducer = combineReducers({    
    discountSchemeReducer,
    bidReducer,
    productReducer,
    errorReducer
});

export type RootState = ReturnType<typeof rootReducer>