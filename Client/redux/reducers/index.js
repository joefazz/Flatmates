// Modules
import { combineReducers } from 'redux-immutablejs';

// File References
import login from './loginReducer';
import profile from './profileReducer';
import nav from './navReducer';

export default combineReducers({    
    login,
    profile,
    nav,
});