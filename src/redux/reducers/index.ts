// Modules
import { combineReducers } from 'redux';

import feed from './feedReducer';
import profile from './profileReducer';
import login from './loginReducer';
import applications from './applicationReducer';
import { apolloReducer } from 'apollo-cache-redux';
import chat from './chatReducer';

// File References
export default combineReducers({
    apollo: apolloReducer,
    login,
    profile,
    feed,
    applications,
    chat
});
