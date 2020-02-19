import { combineReducers } from 'redux'; 
import { backendUserReducer } from './backendUserReducer';
import { dsUserReducer } from './dsUserReducer'; 

export const reducer = combineReducers({dsUserReducer: dsUserReducer, backendUserReducer: backendUserReducer})