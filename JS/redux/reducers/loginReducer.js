import * as Types from '../actions/Types';
import initialState from '../initialState';

export default function loginReducer(state = initialState.login, action = {}) {
    switch(action.type) {
        case Types.FACEBOOK_LOGIN_REQUEST:
            break;
        default:
            return state;
    }
}
