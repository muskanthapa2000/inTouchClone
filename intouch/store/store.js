import {createStore, combineReducers} from 'redux';
import filterReducer from "./reducers/filterReducer.js"
import tableReducer from './reducers/tableReducer.js';

const rootreducers = combineReducers({
    filter : filterReducer,
    table : tableReducer
})

export const store = createStore(rootreducers);