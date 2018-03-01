// Modules
import * as Immutable from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist-immutable';
import createSagaMiddleware from 'redux-saga';

import initialState from '../InitialState';
import reducers from '../reducers';
import { rootSaga } from '../sagas';

// File References
const sagaMiddleware = createSagaMiddleware();

const middlewares = [ sagaMiddleware ];
const enhancers = [ autoRehydrate() ];

if (__DEV__) {
    middlewares.push(createLogger({stateTransformer(state) {
        return state.toJS();
    }}));
}

// TODO: WILL HAVE TO ACCOUNT FOR THE REHYDRATE ACTION BEING FIRED AND MAKING SURE NO ACTIONS CAN FIRE UNTIL THAT COMPLETES
// THIS SHOULD BE EASY WITH SAGA
const INITIAL_STATE = Immutable.fromJS(initialState);

const store = createStore(
    reducers,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middlewares), ...enhancers)
);

sagaMiddleware.run(rootSaga);

export default store;
