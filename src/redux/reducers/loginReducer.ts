import * as Immutable from 'immutable';

import initialState from '../InitialState';
import { Action, LoginStatus, State } from '../ReduxTypes';
import * as Types from '../Types';

// Modules
// File References
const INITIAL_STATE = Immutable.fromJS(initialState.login);

export default function loginReducer(state: State = INITIAL_STATE, action: Action) {
    switch (action.type) {
    // Facebook Login Auth
    case Types.FACEBOOK_LOGIN_REQUEST:
        return state.merge({
            loginStatus: LoginStatus.STARTED
        });
    case Types.FACEBOOK_LOGIN_SUCCESS:
        return state.merge({
            fbAccessToken: action.payload.token.accessToken,
            fbTokenExpiryDate: action.payload.token.expiryDate,
            fbUserId: action.payload.response.userID,
            deniedPermissions: action.payload.response.deniedPermissions,
            grantedPermissions: action.payload.response.grantedPermissions,
            isLoggedIn: true,
            loginStatus: LoginStatus.ENDED
        });
    case Types.FACEBOOK_LOGIN_FAILURE:
        return state.merge({
            error: action.payload,
            loginStatus: LoginStatus.FAILED
        });

    case Types.FACEBOOK_SIGNUP_REQUEST:
        return state.merge({
            loginStatus: LoginStatus.STARTED
        });
    case Types.FACEBOOK_SIGNUP_SUCCESS:
        return state.merge({
            fbAccessToken: action.payload.token.accessToken,
            fbTokenExpiryDate: action.payload.token.expiryDate,
            fbUserId: action.payload.response.userID,
            deniedPermissions: action.payload.response.deniedPermissions,
            grantedPermissions: action.payload.response.grantedPermissions,
            isLoggedIn: true,
            loginStatus: LoginStatus.ENDED,
        });
    case Types.FACEBOOK_SIGNUP_FAILURE:
        return state.merge({
            error: action.payload,
            loginStatus: LoginStatus.FAILED,
        });
    default:
        return state;
    }
}
