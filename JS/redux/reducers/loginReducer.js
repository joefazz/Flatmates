// Modules
import Immutable from 'immutable';

// File References
import * as Types from '../actions/Types';
import initialState from '../initialState';

const INITIAL_STATE = Immutable.fromJS(initialState.login);

export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
    // Facebook Login Auth
    case Types.FACEBOOK_LOGIN_REQUEST:
        return state.merge({
            loginStatus: 'Started'  
        });
    case Types.FACEBOOK_LOGIN_SUCCESS:
        return state.merge({
            fbToken: action.payload.token,
            fbTokenExpires: action.payload.expires
        });
    case Types.FACEBOOK_LOGIN_FAILURE:
        return state.merge({
            error: action.payload
        });
    case Types.FACEBOOK_LOGIN_FULLFIL:
        return state.merge({
            loginStatus: 'Ended'
        });


    default:
        return state;
    }
}
