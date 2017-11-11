// Modules
import Immutable from 'immutable';

// File References
import * as Types from '../actions/Types';
import initialState from '../initialState';

const INITIAL_STATE = Immutable.fromJS(initialState.login);

export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
    case 'persist/REHYDRATE':
        return state.merge({
            isRehydrated: true,
        });
    case Types.FACEBOOK_LOGIN_REQUEST:
        break;
    default:
        return state;
    }
}
