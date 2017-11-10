import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers, 
    compose(applyMiddleware(sagaMiddleware))
);

// sagaMiddleware.run(saga);

export default store;