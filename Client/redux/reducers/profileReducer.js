// Modules
import Immutable from 'immutable';
import _ from 'lodash';

// File References
import * as Types from '../Types';
import initialState from '../InitialState';

const INITIAL_STATE = Immutable.fromJS(initialState.profile);

export default function profileReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
    // Facebook Login Auth
    case Types.GET_USER_DATA_REQUEST:
        return state;
    case Types.GET_USER_DATA_SUCCESS:
        return state.merge({
            name: action.payload.response.name, 
            firstName: action.payload.response.first_name,
            lastName: action.payload.response.last_name,
            gender: _.capitalize(action.payload.response.gender),
            birthday: action.payload.response.birthday,
            email: action.payload.response.email,
            imageUrl: action.payload.response.picture.data.url
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
