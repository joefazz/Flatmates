// Modules
import Immutable from 'immutable';

// File References
import * as Types from '../actions/Types';
import initialState from '../initialState';
import 

const INITIAL_STATE = Immutable.fromJS(initialState.login);

export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
    case 'persist/REHYDRATE':
        return state.merge({
            isRehydrated: true,
        });

    // Facebook Login Auth
    case Types.FACEBOOK_LOGIN_REQUEST:
        break;
    case Types.FACEBOOK_LOGIN_SUCCESS:
        return state.merge({
            fbToken: action.payload.response.token,
            fbTokenExpires: action.payload.response.expires
        });
    case Types.FACEBOOK_LOGIN_FAILURE:
        break;
    case Types.FACEBOOK_LOGIN_FULLFIL:
        break;

        
    default:
        return state;
    }
}
