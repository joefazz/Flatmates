// Modules
import { combineReducers } from 'redux';

import feed from './feedReducer';
import profile from './profileReducer';
import login from './loginReducer';

// File References
export default combineReducers({
    login,
    profile,
    feed
});
