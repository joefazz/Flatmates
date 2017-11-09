import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers(reducers), 
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

export default store;