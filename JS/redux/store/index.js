// Modules
import { createStore, compose, applyMiddleware } from 'redux';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import { AsyncStorage } from 'react-native';

// File References
import saga from '../sagas';
import reducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [ sagaMiddleware ];
let enhancers = [ autoRehydrate() ];

if (__DEV__) {
    middlewares.push(createLogger({stateTransformer(state) {
        return state.toJS();
    }}))
}


// TODO: WILL HAVE TO ACCOUNT FOR THE REHYDRATE ACTION BEING FIRED AND MAKING SURE NO ACTIONS CAN FIRE UNTIL THAT COMPLETES
// THIS SHOULD BE EASY WITH SAGA
const INITIAL_STATE = Immutable.fromJS(initialState);

const store = createStore(
    reducers, 
    INITIAL_STATE, 
    compose(applyMiddleware(...middlewares), ...enhancers
));

persistStore(store, {storage: AsyncStorage});


// sagaMiddleware.run(saga);
console.log(store)
export default store;
