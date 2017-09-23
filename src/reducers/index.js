import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import {routerReducer} from 'react-router-redux'
export default combineReducers({
    todos: todosReducer,
    router: routerReducer,
})