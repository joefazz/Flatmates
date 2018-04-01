// Modules
import { combineReducers } from 'redux';

import feed from './feedReducer';
import login from './loginReducer';

// File References
export default combineReducers({
    login,
    feed
});
