import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from 'redux-thunk'
import authReducer from "./reducers/authReducer";
import taskReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({
 
auth : authReducer,
tasks : taskReducer
})



const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store;
