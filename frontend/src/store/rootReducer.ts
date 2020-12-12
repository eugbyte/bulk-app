import { combineReducers } from 'redux';
import discountSchemeReducer from './reducers/discountSchemeReducer';
import bidReducer from './reducers/bidReducer';
import productReducer from './reducers/productReducer';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';


export const rootReducer = combineReducers({    
    discountSchemeReducer,
    bidReducer,
    productReducer,
    authReducer,
    errorReducer
});

export type RootState = ReturnType<typeof rootReducer>