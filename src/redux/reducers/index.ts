// Modules
import { combineReducers } from 'redux';

import feed from './feedReducer';
import profile from './profileReducer';
import login from './loginReducer';
import applications from './applicationReducer';

// File References
export default combineReducers({
    login,
    profile,
    feed,
    applications
});
