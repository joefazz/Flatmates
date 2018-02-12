// Modules
import { combineReducers } from 'redux-immutablejs';

import feed from './feedReducer';
import login from './loginReducer';
import nav from './navReducer';
import profile from './profileReducer';

// File References
export default combineReducers({
    login,
    profile,
    nav,
    feed
});