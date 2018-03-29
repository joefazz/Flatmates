import { LoginAction, LoginState } from "../../types/ReduxTypes";
import { LoginStatus } from "../../types/Entities";
import initialState from "../InitialState";
import { FacebookLogin, FacebookSignup, CreatePost, HouseLogin } from "../Types";

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
        // Facebook Login Auth
        case FacebookLogin.REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case FacebookLogin.SUCCESS:
            return Object.assign({}, state, {
                fbAccessToken: action.payload.token,
                fbTokenExpiryDate: action.payload.expiryDate,
                fbUserId: action.payload.response.userID,
                deniedPermissions: action.payload.response.deniedPermissions,
                grantedPermissions: action.payload.response.grantedPermissions,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case FacebookLogin.FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case FacebookLogin.FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });

        case FacebookSignup.REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case FacebookSignup.SUCCESS:
            return Object.assign({}, state, {
                fbAccessToken: action.payload.token,
                fbTokenExpiryDate: action.payload.expiryDate,
                fbUserId: action.payload.response.userID,
                deniedPermissions: action.payload.response.deniedPermissions,
                grantedPermissions: action.payload.response.grantedPermissions,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case FacebookSignup.FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case FacebookSignup.FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });

        case CreatePost.SUCCESS:
            return Object.assign({}, state, {
                hasCreatedPost: true
            });

        default:
            return state;
    }
}
