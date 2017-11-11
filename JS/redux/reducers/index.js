// Modules
import { combineReducers } from 'redux-immutablejs';

// File References
import login from './loginReducer';
import nav from './navReducer';

export default combineReducers({
    login,
    nav
});