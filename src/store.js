import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import { routerMiddleware } from 'react-router-redux';


const middleware = applyMiddleware(logger, routerMiddleware(createHistory()));

const store = createStore(reducers, middleware);

export default store;