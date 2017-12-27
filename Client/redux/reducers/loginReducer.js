// Modules
import Immutable from 'immutable';
import _ from 'lodash';

// File References
import * as Types from '../Types';
import initialState from '../InitialState';

const INITIAL_STATE = Immutable.fromJS(initialState.login);
let fbAccessToken;

export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
    // Facebook Login Auth
    case Types.FACEBOOK_LOGIN_REQUEST:
        return state.merge({
            loginStatus: 'Started'
        });
    case Types.FACEBOOK_LOGIN_SUCCESS:
        return state.merge({
            fbAccessToken: action.payload.token.accessToken,
            fbTokenExpiryDate: action.payload.token.expiryDate,
            fbUserId: action.payload.response.userID,
            deniedPermissions: action.payload.response.deniedPermissions,
            grantedPermissions: action.payload.response.grantedPermissions,
            isLoggedIn: true,
        });
    case Types.FACEBOOK_LOGIN_FAILURE:
        return state.merge({
            error: action.payload
        });
    case Types.FACEBOOK_LOGIN_FULFILL:
        return state.merge({
            loginStatus: 'Ended'
        });

    case Types.FACEBOOK_SIGNUP_REQUEST:
        return state.merge({
            loginStatus: 'Started'
        });
    case Types.FACEBOOK_SIGNUP_SUCCESS:
        return state.merge({
            fbAccessToken: action.payload.token.accessToken,
            fbTokenExpiryDate: action.payload.token.expiryDate,
            fbUserId: action.payload.response.userID,
            deniedPermissions: action.payload.response.deniedPermissions,
            grantedPermissions: action.payload.response.grantedPermissions,
        });
    case Types.FACEBOOK_SIGNUP_FAILURE:
        return state.merge({
            error: action.payload
        });
    case Types.FACEBOOK_SIGNUP_FULFILL:
        return state.merge({
            loginStatus: 'Ended'
        });
    // Get data from facebook about user
    case Types.GET_USER_DATA_REQUEST:
        return state;
    case Types.GET_USER_DATA_SUCCESS:
        return state.merge({
            profile: {
                name: action.payload.response.name, 
                firstName: action.payload.response.first_name,
                lastName: action.payload.response.last_name,
                gender: _.capitalize(action.payload.response.gender),
                birthday: action.payload.response.birthday,
                email: action.payload.response.email,
                imageUrl: action.payload.response.picture.data.url
            }
        });
    case Types.GET_USER_DATA_FAILURE:
        return state.merge({
            error: action.payload
        });
    case Types.GET_USER_DATA_FULFILL:
        return state;
    default:
        return state;
    }
}
