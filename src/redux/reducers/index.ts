// Modules
import { combineReducers } from 'redux';

import feed from './feedReducer';
import login from './loginReducer';
import profile from './profileReducer';

// File References
export default combineReducers({
    login,
    profile,
    feed
});
