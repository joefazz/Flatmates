import { LoginAction, LoginState } from '../../types/ReduxTypes';
import { LoginStatus } from '../../types/Entities';
import initialState from '../InitialState';
import { Auth0Login, CreatePost, HouseLogin } from '../Types';

// Modules
// File References
const INITIAL_STATE = initialState.login;

export default function loginReducer(state: LoginState = INITIAL_STATE, action: LoginAction) {
    switch (action.type) {
        // Read only login
        // case Types.READ_ONLY_LOGIN_SUCCESS:
        //     return Object.assign({}, state, {
        //         isReadOnlyEnabled: true
        //     });
        // Auth0 Login Auth
        case Auth0Login.REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case Auth0Login.SUCCESS:
            return Object.assign({}, state, {
                auth_access_token: action.payload.creds.accessToken,
                auth_refresh_token: action.payload.creds.refreshToken,
                auth_access_expiry: action.payload.creds.expiresIn,
                auth_id_token: action.payload.creds.idToken,
                token_type: action.payload.creds.tokenType,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case Auth0Login.FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case Auth0Login.FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });

        // case Auth0Signup.REQUEST:
        //     return Object.assign({}, state, {
        //         loginStatus: LoginStatus.STARTED
        //     });
        // case Auth0Signup.SUCCESS:
        //     return Object.assign({}, state, {
        //         fbAccessToken: action.payload.token,
        //         fbTokenExpiryDate: action.payload.expiryDate,
        //         fbUserId: action.payload.response.userID,
        //         deniedPermissions: action.payload.response.deniedPermissions,
        //         grantedPermissions: action.payload.response.grantedPermissions,
        //         isLoggedIn: true,
        //         loginStatus: LoginStatus.SUCCEED
        //     });
        // case Auth0Signup.FAILURE:
        //     return Object.assign({}, state, {
        //         error: action.payload,
        //         loginStatus: LoginStatus.FAILED
        //     });
        // case Auth0Signup.FULFILL:
        //     return Object.assign({}, state, {
        //         loginStatus: LoginStatus.ENDED
        //     });

        case CreatePost.SUCCESS:
            return Object.assign({}, state, {
                hasCreatedPost: true
            });

        default:
            return state;
    }
}
