// Modules
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';

// File References
import { rootSaga } from '../sagas';
import reducers from '../reducers';
import initialState from '../InitialState';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [ sagaMiddleware ];
let enhancers = [ autoRehydrate() ];

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
    composeWithDevTools(applyMiddleware(...middlewares), ...enhancers
));

sagaMiddleware.run(rootSaga);

export default store;