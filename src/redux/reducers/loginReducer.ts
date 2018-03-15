import { LoginAction, LoginState } from '../../types/ReduxTypes';
import { LoginStatus } from '../../types/Types';
import initialState from '../InitialState';
import * as Types from '../Types';

// Modules
// File References
const INITIAL_STATE = initialState.login;

export default function loginReducer(state: LoginState = INITIAL_STATE, action: LoginAction) {
    switch (action.type) {
        // Read only login
        case Types.READ_ONLY_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isReadOnlyEnabled: true
            });
        // Facebook Login Auth
        case Types.FACEBOOK_LOGIN_REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case Types.FACEBOOK_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                fbAccessToken: action.payload.token,
                fbTokenExpiryDate: action.payload.expiryDate,
                fbUserId: action.payload.response.userID,
                deniedPermissions: action.payload.response.deniedPermissions,
                grantedPermissions: action.payload.response.grantedPermissions,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case Types.FACEBOOK_LOGIN_FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case Types.FACEBOOK_LOGIN_FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });

        case Types.FACEBOOK_SIGNUP_REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case Types.FACEBOOK_SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                fbAccessToken: action.payload.token,
                fbTokenExpiryDate: action.payload.expiryDate,
                fbUserId: action.payload.response.userID,
                deniedPermissions: action.payload.response.deniedPermissions,
                grantedPermissions: action.payload.response.grantedPermissions,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case Types.FACEBOOK_SIGNUP_FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case Types.FACEBOOK_SIGNUP_FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });
        default:
            return state;
    }
}
