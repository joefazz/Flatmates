// Modules
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { autoRehydrate } from 'redux-persist-immutable';
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

middlewares.push(createReactNavigationReduxMiddleware('root', state => state.nav));

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
