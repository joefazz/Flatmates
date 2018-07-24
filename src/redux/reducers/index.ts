// Modules
import { combineReducers } from 'redux';

import profile from './profileReducer';
import login from './loginReducer';
import { apolloReducer } from 'apollo-cache-redux';

// File References
export default combineReducers({
    apollo: apolloReducer,
    login,
    profile,
});
